export default function CyberGrid({ opacity = 0.1 }: { opacity?: number }) {
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 255, 0, ${opacity}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 0, ${opacity}) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        opacity: opacity
      }}
    />
  );
}
