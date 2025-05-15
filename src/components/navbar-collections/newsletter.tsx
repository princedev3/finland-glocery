import React from 'react'

const Newsletter = () => {
    const isLoading = true
  return (
   <section className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-6">
  <div className="container mx-auto max-w-2xl text-center text-white">
    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl">
      <h1 className="text-4xl md:text-5xl font-extrabold text-teal-400 mb-4">
        Be the First to Know
      </h1>
      <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
        Get early access to new products, community updates, and curated content—straight to your inbox.
      </p>

      <form
  
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-teal-500 hover:bg-teal-600 transition-colors rounded-full font-semibold text-white w-full sm:w-auto"
        >
          {isLoading ? "Submitting..." : "Subscribe"}
        </button>
      </form>

      <p className="text-gray-400 text-sm mt-6">
        We value your privacy. Unsubscribe anytime.
      </p>
    </div>
  </div>
</section>

  )
}

export default Newsletter