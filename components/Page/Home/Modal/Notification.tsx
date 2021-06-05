const Notification = () => {
  return (
    <>
      <h1 className="text-xl text-center">Tambah teman</h1>
      <div>
        <div className="flex mt-4 items-center bg-gray-300 p-2 rounded-lg">
          <img src="~/assets/profile.png" className="w-12 h-12 object-cover rounded-full inline-block" alt="" />
          <h3 className="text-xl pr-8 pl-2">Nama</h3>
          <div>
            <button className="block p-1 text-sm bg-blue-400 text-white rounded-lg disabled:bg-gray-800">Terima</button>
            <button className="block p-1 text-sm bg-red-400 text-white rounded-lg disabled:bg-gray-800">Tolak</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Notification
