import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <div className="relative z-10">
        <nav className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10">
          <Link href="/" className="flex items-center space-x-2">
            <Image src={"/bot.png"} alt="bot" width={50} height={50} />
            <span className="text-white font-medium text-xl">NOA stack</span>
          </Link>
        </nav>
        <div className="relative min-h-[calc(100vh-76px)] flex items-center">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
                  Create Production Ready Apps with
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    NOA stack
                  </span>
                </h1>
                <span className=" text-2xl text-white">(Next,ORM,Auth)</span>
              </div>

              <p className="text-gray-400 text-xl mb-4 max-w-2xl mx-auto">
                Start by editing page.tsx
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="inline-flex items-center justify-center gap-2 p-2 text-white border-purple-500 text-primary-foreground border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
                  <Image
                    src={"/file-text.png"}
                    alt="bot"
                    width={30}
                    height={30}
                  />
                  See Docs
                </button>
              </div>
            </div>
          </div>

          {/* Animated robot */}
          <div className="absolute bottom-0 right-0 w-96 h-96">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-purple-500/20 rounded-full blur-xl" />
                  <Image src={"/bot.png"} alt="bot" width={150} height={150} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
