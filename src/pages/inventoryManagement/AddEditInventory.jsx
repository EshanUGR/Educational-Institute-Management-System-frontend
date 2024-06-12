/* eslint-disable react/prop-types */
import {
    Button,
    TextField,
    Grid,
    Box,
    Typography,
    Container,
} from "@mui/material"
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { ASSETS_URL, inventoryCategories, simpleNotification } from "../../utiles";
import FileUploader from "../../components/FileUploader";
import { useDispatch, useSelector } from "react-redux";
import { addInventory, editInventory } from "../../app/features/inventory/inventoryApis";
import SelectOption from "../../components/SelectOption";
import { AddPhotoAlternate } from "@mui/icons-material";

const AddInventory = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()
    const { inventories } = useSelector(state => state.inventory)
    const { user } = useSelector(state => state.user)
    const selectedInventory = inventories.find(inventory => inventory?._id === id)

    const [inventoryDetails, setInventoryDetails] = useState({
        name: "",
        category: "",
        price: "",
        quantity: "",
        file: null
    });

    // check role and redirect
    useEffect(() => {
        if (user.role !== "Inventory Manager") {
            return navigate("/inventory/dashboard")
        }
    }, [user.role, navigate]);

    // Fill input fields with existing data if editing an item
    useEffect(() => {
        if (id) {
            setInventoryDetails({
                name: selectedInventory?.name,
                category: selectedInventory?.category,
                price: selectedInventory?.price,
                quantity: selectedInventory?.quantity,
                file: `${ASSETS_URL}/uploads/inventories/${selectedInventory.file}`
            })
        } else {
            setInventoryDetails({
                name: "",
                category: "",
                price: "",
                quantity: "",
                file: null
            })
        }
    }, [id, selectedInventory?.category, selectedInventory?.file, selectedInventory?.name, selectedInventory?.price, selectedInventory?.quantity]);

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setInventoryDetails({ ...inventoryDetails, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const canAddInventory = [inventoryDetails.name, inventoryDetails.category, inventoryDetails.price, inventoryDetails.quantity, inventoryDetails.file].every(Boolean)

        if (canAddInventory) {
            // check id is present or not to decide whether it's adding new product or editing existing one
            if (id) {
                inventoryDetails.id = id
                const data = { inventoryDetails, navigate }
                dispatch(editInventory(data))
            } else {
                const data = { inventoryDetails, navigate }
                dispatch(addInventory(data))
            }
        } else {
            simpleNotification("error", "All fields are required")
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    {id ? `Edit ${selectedInventory.name}` : "Add new inventory"}
                </Typography>
                <Box component="form" encType="multipart/form-data" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FileUploader
                                details={inventoryDetails}
                                setDetails={setInventoryDetails}
                                Icon={<AddPhotoAlternate
                                    style={{ width: "5rem", height: "5rem" }}
                                />}
                                acceptFileType="image/*"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                fullWidth
                                id="name"
                                label="Name"
                                value={inventoryDetails.name}
                                onChange={handleOnChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SelectOption
                                items={inventoryCategories}
                                name="category"
                                label="Category"
                                value={inventoryDetails.category}
                                details={inventoryDetails}
                                setDetails={setInventoryDetails}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="price"
                                label="Price"
                                name="price"
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                value={inventoryDetails.price}
                                onChange={handleOnChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="quantity"
                                label="Quantity"
                                name="quantity"
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                value={inventoryDetails.quantity}
                                onChange={handleOnChange}
                            />
                        </Grid>
                    </Grid>
                    <Box
                        component="div"
                        sx={{
                            display: "flex",
                            gap: "20px",
                            justifyContent: "space-between"
                        }}
                    >
                        <Link className="flex-1" to="/inventory/dashboard">
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Cancel
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, flex: 1 }}
                        >
                            {id ? "Update" : "Create"}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default AddInventory