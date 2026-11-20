export default function SectionHeading({
  title,
  subtitle,
  className = '',
  size = 'md', // 'sm' | 'md' | 'lg'
  id,
}) {
  // Responsive height scale:
  // Proportional across mobile, tablet, and desktop
  const heightClasses =
    size === 'sm'
      ? 'h-9 xs:h-10 sm:h-13 md:h-16 lg:h-18'
      : size === 'lg'
        ? 'h-10 xs:h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28'
        : 'h-9 xs:h-11 sm:h-14 md:h-18 lg:h-22 xl:h-24'

  // Responsive font size scale matching the badge design
  const fontClasses =
    size === 'sm'
      ? 'text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base'
      : size === 'lg'
        ? 'text-[11px] xs:text-xs sm:text-base md:text-xl lg:text-2xl xl:text-3xl'
        : 'text-[10px] xs:text-[11px] sm:text-sm md:text-base lg:text-xl xl:text-2xl'

  return (
    <div className={`flex flex-col items-center justify-center my-4 sm:my-8 md:my-12 px-2 max-w-full ${className}`}>
      {/* 3-Slice Pill Container: Left Rooster Graphic + Middle Extensible Orange Bar + Right Rounded Cap */}
      <div className={`relative inline-flex items-center ${heightClasses} select-none drop-shadow-md max-w-full`}>

        {/* Left Segment: Concentric Arc Ripples + Rooster Emblem Badge + Start of Orange Pill */}
        <img
          src="/heading_rooster_left_clean.png"
          alt=""
          aria-hidden="true"
          className="h-full w-auto block object-contain select-none pointer-events-none shrink-0"
        />

        {/* Middle Segment: Pure #e13f0c Orange Bar spanning whatever width the text requires */}
        <div className="relative h-full flex items-center -ml-[1.5px] -mr-[1.5px] min-w-0">
          {/* Orange fill positioned to perfectly align with y=45..152 (23.56% to 80.11%) of left & right PNGs */}
          <div
            className="absolute inset-x-0 bg-[#e13f0c]"
            style={{
              top: '23.56%',
              bottom: '19.89%',
            }}
          />

          {/* Heading Text centered inside the orange bar */}
          <div className="relative z-10 flex items-center justify-center px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8">
            <h2
              id={id}
              className={`text-white font-black tracking-wider uppercase font-sans whitespace-nowrap drop-shadow-xs ${fontClasses}`}
            >
              {title}
            </h2>
          </div>
        </div>

        {/* Right Segment: Smooth Pill End Cap */}
        <img
          src="/heading_pill_right_clean.png"
          alt=""
          aria-hidden="true"
          className="h-full w-auto block object-contain select-none pointer-events-none shrink-0"
        />
      </div>

      {/* Optional Subtitle */}
      {subtitle && (
        <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 font-semibold max-w-2xl text-center px-4 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
