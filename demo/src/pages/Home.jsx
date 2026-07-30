export default function Home() {
  return (
    <div className="d-flex flex-column min-vh-100" style={{
  backgroundImage: 'url("https://png.pngtree.com/background/20250125/original/pngtree-stack-of-books-in-a-library-with-sunlight-streaming-through-the-picture-image_15776652.jpg")',
  backgroundSize: 'cover'
}}>
      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <h1 className=" text-warning pb-3 fw-bold" style={{textShadow:'1px 1px 4px black' }}>Welcome To LibriX!</h1>
        <h3 className="text-white" style={{textShadow:'1px 1px 4px black' }}>Please login to continue</h3>
      </div>
    </div>
  );
}