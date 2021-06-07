import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getContactsDataKonfirmasi } from 'redux/actions/contact'
import { apiDestroyKonfirmasi } from 'services/contacts'

const Notification = () => {
  const dispatch = useDispatch()
  const contactKonfirmasi = useSelector((state: any) => state?.contactStore?.contactKonfirmasi)
  useEffect(() => {
    (async () => {
      dispatch(getContactsDataKonfirmasi())
    })()
  }, [])
  const terimaTeman = async (id: number) => {
    await apiDestroyKonfirmasi(id, {
      status: 'diterima'
    })
  }
  const tolakTeman = async (id: number) => {
    await apiDestroyKonfirmasi(id, {
      status: 'ditolak'
    })
  }
  return (
    <>
      <div>
        {
          contactKonfirmasi?.map((val: any, index: number) => (
            <div className="flex mt-4 items-center bg-gray-300 p-2 rounded-lg" key={index}>
              <img src="/profile.png" className="w-12 h-12 object-cover rounded-full inline-block" alt="" />
              <h3 className="text-xl pr-8 pl-2">{val?.friend?.username}</h3>
              <div>
                <button onClick={() => terimaTeman(val?.friend?.id)} className="block p-1 text-sm bg-blue-400 text-white rounded-lg disabled:bg-gray-800">Terima</button>
                <button onClick={() => tolakTeman(val?.friend?.id)} className="block p-1 text-sm bg-red-400 text-white rounded-lg disabled:bg-gray-800">Tolak</button>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Notification
