import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from 'redux/actions/user'
import { apiAddContact } from 'services/contacts'

const UserList = () => {
  const dispatch = useDispatch()
  const usersData = useSelector((state: any) => state?.userStore?.users)
  useEffect(() => {
    (async () => {
      dispatch(getUserData())
    })()
  }, [])

  const addTeman = async (username: string) => {
    await apiAddContact({
      friend: username
    })
  }

  return (
    <>
      <h1 className="text-xl text-center">Daftar User</h1>
      <div>
        {
          usersData?.map((val: any, index: number) => (
            <div className="flex mt-4 items-center bg-gray-300 p-2 rounded-lg" key={index}>
              <img src="/profile.png" className="w-12 h-12 object-cover rounded-full inline-block" alt="" />
              <h3 className="text-xl pr-8 pl-2">{val?.username}</h3>
              {
                val?.berteman?.status === 'diterima' && (
                  <button onClick={() => console.log(val)} className="block p-1 text-sm bg-red-400 text-white rounded-lg disabled:bg-gray-800">Hapus Pertemanan</button>
                )
              }
              {
                val?.berteman?.status === 'proses' && (
                  <div className="block p-1 text-sm bg-yellow-400 text-white rounded-lg disabled:bg-gray-800">Menunggu Konfirmasi</div>
                )
              }
              {
                val?.berteman?.status === 'ditolak' && (
                  <div className="block p-1 text-sm bg-red-400 text-white rounded-lg disabled:bg-red-800">Ditolak</div>
                )
              }
              {
                !val?.berteman && (
                  <button onClick={() => addTeman(val?.username)} className="block p-1 text-sm bg-blue-400 text-white rounded-lg disabled:bg-gray-800">Tambah Sebagai Teman</button>
                )
              }
            </div>
          ))
        }
      </div>
    </>
  )
}

export default UserList
