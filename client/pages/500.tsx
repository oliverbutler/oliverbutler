export default function Custom500() {
  return (
    <div className="flex w-full justify-center">
      <div className="w-1/3">
        <img src="/500.svg" className="w-full mb-4" />
        <p>
          Oh no! Something's gone wrong... This will be logged and i'll look
          into it!
        </p>
      </div>
    </div>
  );
}
