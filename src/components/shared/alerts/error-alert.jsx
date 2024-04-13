function ErrorAlert({ message }) {
   return (
      <div className="text-white text-xl rounded shadow-md border-2 border-red-800 p-2">
         <h1>{message}</h1>
      </div>
   );
}

export default ErrorAlert
