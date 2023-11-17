import Form from "./Form";

export default async function Home() {
  return (
    <section className="w-full flex flex-col items-center justify-center py-10">
      <div className="flex items-center justify-start gap-3">
        <div className="w-min rounded-xl p-1 bg-skin-primary/20 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-skin-primary"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M22 5a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" />
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M12 2c1.399 0 2.59 0 3.612.038a4.5 4.5 0 0 0 6.35 6.35C22 9.41 22 10.601 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2Zm2.5 8.75a.75.75 0 0 1 0-1.5H17a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-.69l-2.013 2.013a1.75 1.75 0 0 1-2.474 0l-1.586-1.586a.25.25 0 0 0-.354 0L7.53 14.53a.75.75 0 0 1-1.06-1.06l2.293-2.293a1.75 1.75 0 0 1 2.474 0l1.586 1.586a.25.25 0 0 0 .354 0l2.012-2.013H14.5Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-3xl uppercase font-semibold text-gray-800">
          Z Score
        </h2>
      </div>

      <p className="mt-3 text-sm text-gray-600 max-w-md text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
        voluptatem eligendi explicabo consequatur ffr consequuntur fugiat
        fugiat.
      </p>
      <Form />
    </section>
  );
}
