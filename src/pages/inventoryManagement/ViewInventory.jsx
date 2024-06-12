import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { ASSETS_URL } from "../../utiles"
import { ArrowBack } from "@mui/icons-material"

const ViewInventory = () => {
    const { id } = useParams()
    const { inventories } = useSelector(state => state.inventory)
    const selectedInventory = inventories.find(inventory => inventory._id === id)

    return (
        <div className="relative my-10 max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md">
            <img className="rounded-t-lg" src={`${ASSETS_URL}/uploads/inventories/${selectedInventory.file}`} alt="" />

            <Link to="/inventory/dashboard" className="absolute top-0 right-0 bg-blue-600 rounded-md p-2 text-white m-2 cursor-pointer uppercase flex items-center gap-2">
                <ArrowBack />
                Go to dashboard
            </Link>

            <hr />

            <div className="p-5 flex flex-col gap-5">
                <p className="flex w-full justify-between items-center">Name: <span>{selectedInventory.name}</span></p>
                <p className="flex w-full justify-between items-center">Category: <span>{selectedInventory.category}</span></p>
                <p className="flex w-full justify-between items-center">Price: <span>${selectedInventory.price}</span></p>
                <p className="flex w-full justify-between items-center">Quantity: <span>{selectedInventory.quantity}</span></p>
                <p className="flex w-full justify-between items-center">Value: <span>${selectedInventory.quantity * selectedInventory.price}</span></p>
            </div>
        </div>

    )
}

export default ViewInventory