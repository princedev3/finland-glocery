import { NextRequest, NextResponse } from "next/server";
import { v2 as cloud } from "cloudinary";
import streamifier from "streamifier";
import { auth } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { Prisma } from "@prisma/client";

cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({
        message: "product not created/ only admin can create product",
        status: 500,
      });
    }
    const formdata = await req.formData();
    const colors = formdata.get("colors") as string;
    const cat = formdata.get("cat") as string;
    const name = formdata.get("name") as string;
    const size = formdata.get("size") as string;
    const desc = formdata.get("desc") as string;
    const discount = formdata.get("discount") as string;
    const price = formdata.get("price") as string;
    const quantity = formdata.get("quantity") as string;
    const storage = formdata.get("storage") as string;
    const ingridents = formdata.get("ingridents") as string;
    const file = formdata.getAll("image") as File[];

    const images: string[] = file.length
      ? await Promise.all(
          file.map(async (item) => {
            return new Promise(async (resolve, rejects) => {
              const bytes = Buffer.from(await item.arrayBuffer());
              const stream = cloud.uploader.upload_stream(
                { folder: "shop" },
                (error, result) => {
                  if (error) {
                    rejects(error);
                  } else {
                    resolve(result?.secure_url as string);
                  }
                }
              );
              streamifier.createReadStream(bytes).pipe(stream);
            });
          })
        )
      : [];
    await prisma.product.create({
      data: {
        name,
        desc,
        sizes: size.split(","),
        userId: session?.user?.id as string,
        price: Number(price),
        colors: JSON.parse(colors),
        quantity: Number(quantity),
        discount:discount?parseInt(discount):0,
        cat,
        images,
        storage,ingridents
      },
    });

    return NextResponse.json({ message: "product created", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "product not created", status: 500 });
  }
};
export const GET = async (req: NextRequest) => {
  try {
      const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
      const search = req.nextUrl.searchParams.get("search") || "";
    const currentPage = isNaN(page) || page < 1 ? 1 : page;
    const POST_PER_PAGE = Number(process.env.POST_PER_PAGE) || 10;
 const where = search
      ? { name: { contains: search,  mode: Prisma.QueryMode.insensitive, } }
      : {};
   const [allProducts, count] = await Promise.all([

     prisma.product.findMany({
         where,
          take: POST_PER_PAGE,
          skip: POST_PER_PAGE * (currentPage - 1),
          orderBy: {
            createdAt: "desc",
          },
        }),
        prisma.product.count({where})
   ] ) 
    return NextResponse.json({ message: { allProducts, count }, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not get product", status: 500 });
  }
};