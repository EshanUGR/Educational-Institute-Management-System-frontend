import { Button, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import SelectOption from "../../components/SelectOption";
import { useSelector } from "react-redux";
import { ASSETS_URL, inventoryCategories, simpleNotification } from "../../utiles";
import { problemSubmit } from "./apis";
import { useNavigate } from "react-router-dom";

const checkCategoryExists = (category, data) => {
    return data.some(item => item.category === category)
}

const InventoryStaff = () => {
    const navigate = useNavigate()
    const [itemsToSelectedCat, setItemsToSelectedCat] = useState([])
    const [formData, setFormData] = useState({
        itemId: "",
        problem: "",
        category: "",
    });
    const [item, setItem] = useState(null);

    const { inventories } = useSelector(state => state.inventory)
    const { user } = useSelector(state => state.user)

    useEffect(() => {
        if (!checkCategoryExists(formData.category, itemsToSelectedCat)) {
            setFormData({ ...formData, itemId: "" })
        }
    }, [formData.category, itemsToSelectedCat]);

    useEffect(() => {
        if (!user) {
            navigate("/login")
        } else if (user?.role !== "Inventory Staff") {
            simpleNotification("error", "You not allowed to this page!")
            navigate("/inventory/dashboard")
        }
    }, [navigate, user, user?.role]);

    useEffect(() => {
        if (formData.category !== "") {
            setItemsToSelectedCat(inventories.filter(i => i.category === formData.category))
        }
    }, [formData.category]);

    useEffect(() => {
        const string = formData.itemId.split("-")
        const itemId = string[string.length - 1].trim()
        if (itemId) {
            setItem(itemsToSelectedCat.find(i => i._id === itemId))
        } else {
            setItem(null)
        }
    }, [formData.itemId, formData.category, itemsToSelectedCat, inventories]);

    const canSubmit = [formData.itemId, formData.problem, formData.category].every(Boolean)

    const items = itemsToSelectedCat.map(i => `${i.name} - ${i._id}`)

    const submitForm = (e) => {
        e.preventDefault()

        if (canSubmit) {
            problemSubmit(formData).then(res => {
                if (res) {
                    simpleNotification("success", res.message)
                    navigate("/inventory/dashboard")
                }
            })
        } else {
            simpleNotification("error", "Please fill the form")
        }
    }

    return (
        <div className="p-5">
            <Typography variant="h4" pb={4}>
                Inventory staff
            </Typography>

            {item && <div className="max-w-sm mx-auto flex flex-col items-center mb-10">
                <img src={`${ASSETS_URL}/uploads/inventories/${item.file}`} className="w-[200px] h-[200px]" />
                <div>Category - <span>{item.category}</span></div>
                <div>Name - <span>{item.name}</span></div>
                <div>Price - <span>Rs.{item.price}</span></div>
                <div>Qty - <span>{item.quantity}</span></div>
                <div>Total Value - <span>Rs.{item.price * item.quantity}</span></div>
            </div>}

            <form onSubmit={submitForm} className="max-w-lg mx-auto flex flex-col gap-4">
                <SelectOption
                    details={formData}
                    setDetails={setFormData}
                    items={inventoryCategories}
                    name="category"
                    label="Category"
                    value={formData.category}
                />
                {formData.category.trim() !== "" && itemsToSelectedCat.length > 0 &&
                    <SelectOption
                        details={formData}
                        setDetails={setFormData}
                        items={items}
                        name="itemId"
                        label="Select item"
                        value={formData.itemId}
                    />}
                <textarea
                    className="border-[2px] border-gray-300 rounded-[3px] p-2 w-full"
                    rows={4}
                    name="problem"
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    label="Enter the problem"
                    placeholder="Enter the problem"
                />
                <div className="w-full flex justify-end gap-2">
                    <Button
                        onClick={() => {
                            setFormData({ itemId: "", problem: "", category: "" })
                        }}
                        sx={{ width: "150px" }}
                        variant="contained" size="large">
                        Clear
                    </Button>
                    <Button
                        // disabled={!canSubmit}
                        type="submit"
                        sx={{ width: "150px" }}
                        variant="contained" size="large">Submit</Button>
                </div>
            </form >
        </div >
    )
}

export default InventoryStaff