/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteInventory, getAllInventories } from "../../app/features/inventory/inventoryApis";
import { ASSETS_URL, inventoryCategories } from "../../utiles";
import { AttachMoney, Category, Delete, Edit, ShoppingCart, Visibility, Warning } from "@mui/icons-material";
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ExcelReportGenerator from "../../components/ExcelReportGenerator";
import { getAllInventoryIssues } from "./apis";
import SelectOption from "../../components/SelectOption";

const InventoryDashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [totalIssues, setTotalIssues] = useState(0);
    const { inventories } = useSelector(state => state.inventory)
    const totalValue = inventories.reduce((total, item) => {
        return total + item.quantity * item.price;
    }, 0);
    const [searchQuery, setSearchQuery] = useState("");
    const { user } = useSelector(state => state.user)

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [navigate, user]);

    useEffect(() => {
        dispatch(getAllInventories())
    }, [dispatch]);

    useEffect(() => {
        getAllInventoryIssues().then(res => setTotalIssues(res.length))
    }, []);

    const filteredData = () => {
        if (!searchQuery.trim()) {
            return inventories
        } else {
            return inventories.filter(item => item.category === searchQuery)
        }
    }

    const deleteInventoryHandler = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { payload } = await dispatch(deleteInventory(id))
                if (payload) {
                    Swal.fire({
                        title: "Deleted!",
                        text: payload.message,
                        icon: "success",
                        timer: 2000,
                    });
                }
            }
        });
    }

    const reportData = inventories.map(inventory => {
        return {
            "Name": inventory.name,
            "Category": inventory.category,
            "Price": "Rs." + inventory.price,
            "Quantity": inventory.quantity,
            "Value": "Rs." + inventory.price * inventory.quantity,
        }
    })

    return (
        <div className="p-5">
            <Typography variant="h4" pb={4}>
                Inventories and summary
            </Typography>

            <div className="grid grid-cols-2 lg:grid-cols-4 place-items-center gap-5">
                <div className="h-[150px] w-full border-2 flex items-center justify-center flex-col rounded-lg shadow-md text-center font-bold text-xl">
                    <div className="p-3 bg-blue-600 rounded-full">
                        <ShoppingCart fontSize="large" className="text-white" />
                    </div>
                    Total Items
                    <span className="font-normal">{inventories?.length}</span>
                </div>
                <div className="h-[150px] w-full border-2 flex items-center justify-center flex-col rounded-lg shadow-md text-center font-bold text-xl">
                    <div className="p-3 bg-green-600 rounded-full">
                        <AttachMoney fontSize="large" className="text-white" />
                    </div>
                    Total value
                    <span className="font-normal">Rs.{totalValue}</span>
                </div>
                <div className="h-[150px] w-full border-2 flex items-center justify-center flex-col rounded-lg shadow-md text-center font-bold text-xl">
                    <div className="p-3 bg-red-600 rounded-full">
                        <Warning fontSize="large" className="text-white" />
                    </div>
                    No of issues
                    <span className="font-normal">{totalIssues}</span>
                </div>
                <div className="h-[150px] w-full border-2 flex items-center justify-center flex-col rounded-lg shadow-md text-center font-bold text-xl">
                    <div className="p-3 bg-yellow-500 rounded-full">
                        <Category fontSize="large" className="text-white" />
                    </div>
                    All categories
                    <span className="font-normal">{inventoryCategories.length}</span>
                </div>
            </div>

            <div className="flex justify-between items-end mt-10 mb-3">
                <div className="w-[300px] flex items-end">
                    <div className="w-full">
                        <SelectOption
                            label="Filter by subject"
                            items={inventoryCategories}
                            details={searchQuery}
                            setDetails={setSearchQuery}
                            name="subject"
                            value={searchQuery}
                            singleValueUpdate={true}
                        />
                    </div>
                    <Button sx={{ pb: 0 }} onClick={() => setSearchQuery("")}>Clear</Button>
                </div>

                <div className="">
                    <ExcelReportGenerator
                        data={reportData}
                        fileName="Inventory_Item_Details" />
                </div>
            </div>

            <div className="overflow-auto shadow-md px-2">
                {inventories.length > 0 ?
                    filteredData().length > 0 ?
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 sm:rounded-lg">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Image
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Quantity
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Value
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData().map(inventory => (
                                    <tr key={inventory?._id}>
                                        <th scope="row" className="">
                                            <img
                                                src={`${ASSETS_URL}/uploads/inventories/${inventory?.file}`}
                                                className="w-[60px] h-[60px] object-cover rounded-full border-2 border-blue-400" />
                                        </th>
                                        <td className="px-6 py-4 text-nowrap">
                                            {inventory?.name}
                                        </td>
                                        <td className="px-6 py-4 text-nowrap">
                                            {inventory?.category}
                                        </td>
                                        <td className="px-6 py-4 text-nowrap">
                                            Rs.{inventory?.price}
                                        </td>
                                        <td className="px-6 py-4 text-nowrap">
                                            {inventory?.quantity}
                                        </td>
                                        <td className="px-6 py-4 text-nowrap">
                                            Rs.{inventory?.quantity * inventory?.price}
                                        </td>
                                        <td className="px-6 py-4 text-nowrap flex gap-2 justify-end items-center">
                                            <Tooltip title="View Inventory">
                                                <IconButton>
                                                    <Link to={`/inventory/view-inventory/${inventory?._id}`}>
                                                        <Visibility />
                                                    </Link>
                                                </IconButton>
                                            </Tooltip>
                                            {user?.role === "Inventory Manager" && <>
                                                <Tooltip title="Edit Inventory">
                                                    <IconButton>
                                                        <Link to={`/inventory/edit-inventory/${inventory?._id}`}>

                                                            <Edit />
                                                        </Link>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete Inventory">
                                                    <IconButton onClick={() => deleteInventoryHandler(inventory?._id)}>
                                                        <Delete />
                                                    </IconButton>
                                                </Tooltip>
                                            </>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        :
                        <div className="text-center">No item found with this <b>{searchQuery}</b></div>
                    :
                    <div className="flex flex-col items-center gap-2 mb-5">
                        <p className='text-xl font-semibold text-gray-700 mt-6'>No Inventories Found</p>
                        <Button variant="contained" sx={{ width: "fit-content" }}>
                            <Link to="/inventory/add-inventory">Add Inventory</Link>
                        </Button>
                    </div>
                }

            </div>
        </div >
    )
}

export default InventoryDashboard