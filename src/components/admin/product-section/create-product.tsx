"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { LoaderCircle, X } from "lucide-react";
import { useCreateProductMutation } from "@/app/_apis_/_product_index.apis";
import { toast } from "sonner";

const CreateProduct = () => {
  const [createProduct,{isLoading}]=useCreateProductMutation()
  const [colors, setColors] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const addColor = () => {
    if (!colors.includes(selectedColor)) {
      setColors([...colors, selectedColor]);
    }
  };
  const removeColor = (colorToRemove: string) => {
    setColors(colors.filter((color) => color !== colorToRemove));
  };
const handleCreateProduct =async(e:React.FormEvent<HTMLFormElement>)=>{
try {
  e.preventDefault()
  const target = e.target as HTMLFormElement
  const formdata = new FormData(target)
   formdata.append("colors", JSON.stringify(colors));
    const res = await createProduct(formdata);
    if (res.data.status === 200) {
      toast.success(res.data.message);
      target.reset();
      setColors([]);
      return
    }
 toast.error(res.data.message);
} catch (error) {
  console.log(error)
}
}
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="inline-flex w-[48px] h-[48px] rounded-full font-bold text-3xl text-white bg-[var(--color-custom-base)] shadow-md cursor-pointer items-center justify-center leading-none">
          <span>+</span>
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-[100vh] px-4 pb-4 pt-2">
        <div className="flex flex-col h-full">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-semibold text-gray-600 mb-2">
              Add Product
            </DrawerTitle>
          </DrawerHeader>
          {/* Scrollable form area */}
          <div className="overflow-y-auto flex-1 pr-1">
            <form onSubmit={handleCreateProduct} className="grid gap-6 pb-4">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="grid gap-y-1">
                  <label className="text-gray-700 font-normal capitalize">Category</label>
                  <input
                    type="text"
                    required
                    name="cat"
                    placeholder="Add product category"
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-custom-base)] focus:border-transparent"
                  />
                </div>
                <div className="grid gap-y-1">
                  <label className="text-gray-700 font-normal capitalize">Description</label>
                  <input
                    type="text"
                    required
                    name="desc"
                    placeholder="Describe your product"
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-custom-base)] focus:border-transparent"
                  />
                </div>
                <div className="grid gap-y-1">
                  <label className="text-gray-700 font-normal capitalize">Discount</label>
                  <input
                    type="number"
                    name="discount"
                      step="0.01"  
                    placeholder="Do you have discount"
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-custom-base)] focus:border-transparent"
                  />
                </div>
                <div className="grid gap-y-1">
                  <label className="text-gray-700 font-normal capitalize">images</label>
                  <input
                    accept="image/*"
                    type="file"
                    multiple
                    name="image"
                    required
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 file:text-sm file:mr-2 file:bg-gray-100 file:border-0 file:rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-custom-base)]"
                  />
                </div>
                <div className="grid gap-y-1">
                  <label className="text-gray-700 font-normal capitalize">Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Product name"
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-custom-base)] focus:border-transparent"
                  />
                </div>
                <div className="grid gap-y-1">
                  <label className="text-gray-700 font-normal capitalize">product storage</label>
                  <input
                    name="storage"
                    type="text"
                    required
                    placeholder="product storage"
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-custom-base)] focus:border-transparent"
                  />
                </div>
                <div className="grid gap-y-1">
                  <label className="text-gray-700 font-normal capitalize">ingridents</label>
                  <input
                    name="ingridents"
                    type="text"
                    required
                    placeholder="product ingridents"
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-custom-base)] focus:border-transparent"
                  />
                </div>
                <div className="grid gap-y-1">
                  <label className="text-gray-700 font-normal capitalize">Price</label>
                  <input
                    required
                    name="price"
                    type="number"
                      step="0.01"  
                    placeholder="Product price"
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-custom-base)] focus:border-transparent"
                  />
                </div>
                <div className="grid gap-y-1">
                  <label className="text-gray-700 font-normal capitalize">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    required
                    placeholder="Product quantity"
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-custom-base)] focus:border-transparent"
                  />
                </div>
                <div className="grid gap-y-1">
                  <label className="text-gray-700 font-normal capitalize">Sizes</label>
                  <input
                    type="text"
                    required
                    name="size"
                    placeholder="E.g. S, M, L"
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-custom-base)] focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500">Separate each value with a comma (,)</p>
                </div>
                <div className="grid gap-y-1">
                  <label className="text-gray-700 font-normal capitalize">Colors</label>
                  <div className="grid gap-3">
                    <div className="grid grid-cols-[auto_1fr] gap-2">
                      <input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-10 h-10 cursor-pointer border rounded-md"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addColor}
                        className="px-3 w-full h-[38px] rounded-md"
                      >
                        Add color
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((color, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 p-1 border rounded-md"
                          style={{ backgroundColor: color }}
                        >
                          <span className="w-6 h-6 rounded-md" style={{ backgroundColor: color }} />
                          <button type="button" onClick={() => removeColor(color)}>
                            <X className="h-4 w-4 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
                <DrawerFooter>
            <Button
            disabled={isLoading}
              type="submit"
              variant="default"
              className="px-3 w-full text-lg h-[38px] bg-[var(--color-custom-base)] text-white hover:opacity-90 rounded-md"
            >
               {isLoading ? (
              <LoaderCircle className="animate-spin h-5 w-5 mx-auto" />
            ) : (
              " Create"
            )}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="text-lg">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
            </form>
          </div>
          {/* Footer */}
        
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateProduct;
