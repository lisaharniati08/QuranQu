// MountainCard.jsx — Card dengan divider mountains di bawah header card
export default function MountainCard({
  children,
  headerContent,
  headerImage,
  headerBg = 'linear-gradient(135deg, #1a6b4a, #2d9e72)',
  className = '',
}) {
  return (
    <div className={`rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white ${className}`}>
      {/* Header area with mountain bottom */}
      <div className="relative" style={!headerImage ? { background: headerBg } : {}}>

        {/* Mode: gambar penuh */}
        {headerImage && (
          <img
            src={headerImage}
            alt=""
            className="w-full object-cover"
            style={{ height: '200px' }}
          />
        )}

        {/* Overlay + konten di atas gambar */}
        {headerImage && headerContent && (
          <div className="absolute inset-0 flex flex-col justify-end px-5 pb-10" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)' }}>
            {headerContent}
          </div>
        )}

        {/* Mode: warna/gradient tanpa gambar */}
        {!headerImage && (
          <div className="px-5 pt-5 pb-10">
            {headerContent}
          </div>
        )}

        {/* Mountains SVG divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" style={{ height: '36px' }}>
          <svg
            viewBox="0 0 500 36"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              d="M0,36 L0,20 C20,20 30,8 50,8 C70,8 80,18 100,16 C120,14 130,4 155,4 C180,4 190,16 210,14 C230,12 240,2 265,2 C290,2 300,14 320,12 C340,10 350,0 375,0 C400,0 410,12 430,10 C450,8 460,20 480,18 C495,17 498,20 500,20 L500,36 Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 pb-5 pt-2">
        {children}
      </div>
    </div>
  )
}