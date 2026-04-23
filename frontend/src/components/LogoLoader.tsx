import ASCIIAnimation from "#/components/ui/ascii.tsx";

const LogoLoader = () => {
  return (
    <ASCIIAnimation
      frameFolder="animations/app-loader"
      quality="high"
      fps={60}
      frameCount={360}
      className="flex items-center justify-center h-[500px]"
    />
  )
}

export default LogoLoader