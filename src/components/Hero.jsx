export default function Hero({ onRequestInfo }) {
  return (
    <div className="relative w-full overflow-visible z-20">
      
      {/* ─────────────────────────────────────────────────────────────
          DESKTOP & TABLET LAYOUT (>= 768px):
          Matches the reference image precisely:
          - Upper space on left text and right image is compact/shortened
          - Chickens' legs are 100% authentic, clean, natural photography
          - Orange banner baseline ends cleanly, legs step out onto white ground
          - Right-side emblem and chickens are prominent and large
          ───────────────────────────────────────────────────────────── */}
      <section className="hidden md:block relative w-full bg-white overflow-visible">
        {/* Full-width orange banner strip with white floor below */}
        <div className="relative w-full overflow-visible [background:linear-gradient(to_bottom,#fbc38a_0%,#fbc38a_91.2%,#ffffff_91.2%,#ffffff_100%)]">
          <div className="relative w-full mx-auto overflow-visible">
            
            {/* The Authentic Hero Banner Graphic */}
            <div className="relative w-full aspect-[1024/534] overflow-visible">
              <img
                src="/hero_bg_banner.jpg"
                alt="Nutridian Animal Health - Leading Innovation Through Technology"
                className="w-full h-full object-cover block select-none pointer-events-none"
              />

              {/* Left-Side HTML Overlay: Large, bold, shifted up so button is clearly visible on screen */}
              <div className="absolute inset-y-0 left-0 w-[54%] lg:w-[51%] xl:w-[49%] flex flex-col justify-start pt-5 sm:pt-7 md:pt-8 lg:pt-10 xl:pt-12 pl-6 md:pl-10 lg:pl-14 xl:pl-16 2xl:pl-20 pr-4 sm:pr-6 z-10">
                
                {/* Main Headline */}
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[50px] 2xl:text-[56px] font-extrabold tracking-tight text-white leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
                    Welcome To,
                  </h2>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[62px] 2xl:text-[70px] font-black tracking-tight text-white leading-[1.08] mt-0.5 sm:mt-1 lg:mt-1.5 drop-shadow-[0_3px_8px_rgba(0,0,0,0.35)]">
                    Nutridian Animal Health
                  </h1>
                  
                  {/* White Horizontal Line under headline */}
                  <div className="h-[2px] md:h-[2.5px] lg:h-[3px] w-full max-w-md lg:max-w-xl xl:max-w-2xl bg-white/90 mt-2 sm:mt-2.5 lg:mt-3 drop-shadow-sm" />
                </div>

                {/* Description Paragraph */}
                <p className="text-white text-xs sm:text-sm md:text-base lg:text-[16.5px] xl:text-[18.5px] 2xl:text-[20.5px] font-semibold leading-relaxed max-w-xl lg:max-w-2xl xl:max-w-3xl mt-2.5 md:mt-3.5 lg:mt-4 xl:mt-5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
                  A premier Indian manufacturer of high-performance poultry feed additives. Our mission is simple: provide farmers with a total range of advanced poultry feed additives that are both highly effective, result oriented and deeply affordable. We help our farmers to maximize flock performance and elevate profitability through every stage of production.
                </p>

                {/* Request Information Button - Kept cleanly visible on screen */}
                <div className="pt-3 md:pt-4 lg:pt-5 xl:pt-6">
                  <button
                    onClick={onRequestInfo}
                    className="group inline-flex items-center justify-center px-7 md:px-8 lg:px-10 xl:px-11 py-2.5 md:py-3 lg:py-3.5 xl:py-4 rounded-full text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-black text-[#b91c1c] bg-gradient-to-b from-white via-[#f1f3f6] to-[#d8dce2] border border-[#b0b7c3] shadow-[0_4px_16px_rgba(0,0,0,0.22),inset_0_2px_2px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.28),inset_0_2px_2px_rgba(255,255,255,1)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Request Information</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          MOBILE LAYOUT (< 768px):
          Single unified banner with prominent bold text and clean chicken legs
          ───────────────────────────────────────────────────────────── */}
      <section className="block md:hidden w-full bg-white overflow-visible">
        <div className="w-full bg-gradient-to-r from-[#fbc38a] via-[#f7b47a] to-[#f8b179] px-4 xs:px-5 sm:px-8 pt-5 sm:pt-6 pb-0 text-left overflow-visible">
          <div>
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
              Welcome To,
            </h2>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight mt-0.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
              Nutridian Animal Health
            </h1>
            <div className="h-[2px] w-full max-w-xs bg-white/85 mt-2.5 drop-shadow-xs" />
          </div>

          <p className="text-white text-xs sm:text-sm font-semibold leading-relaxed mt-2.5 sm:mt-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]">
            A premier Indian manufacturer of high-performance poultry feed additives. Our mission is simple: provide farmers with a total range of advanced poultry feed additives that are both highly effective, result oriented and deeply affordable. We help our farmers to maximize flock performance and elevate profitability through every stage of production.
          </p>

          <div className="pt-3.5 sm:pt-4">
            <button
              onClick={onRequestInfo}
              className="w-full xs:w-auto inline-flex items-center justify-center px-7 py-3 rounded-full text-xs sm:text-sm font-black text-[#b91c1c] bg-gradient-to-b from-white via-[#f1f3f6] to-[#d8dce2] border border-[#b0b7c3] shadow-[0_4px_14px_rgba(0,0,0,0.2)] active:scale-95 transition-all cursor-pointer text-center"
            >
              <span>Request Information</span>
            </button>
          </div>

          {/* Mobile Mascot Graphic: clean legs stepping out onto white background */}
          <div className="w-full flex justify-center pt-2 overflow-visible">
            <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[340px] flex justify-center -mb-8 z-30">
              <img
                src="/hero_mascot_seamless.png"
                alt="Nutridian Animal Health Poultry Mascot"
                className="w-full h-auto object-contain block select-none pointer-events-none"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

