import { Customer } from "../models/customer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";

// Create new customer with only name, email, phone
const createCustomer = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    
    // Get dealer from auth middleware
    const dealerId = req.dealer._id;

    // Validation
    if (!email || !phone || !name) {
        throw new ApiError(400, "Name, email and phone are required");
    }

    // Check if customer already exists with this email for this dealer
    const existingCustomer = await Customer.findOne({ 
        email,
        dealer: dealerId 
    });

    if (existingCustomer) {
        throw new ApiError(400, "Customer with this email already exists");
    }

    // Create customer with only required fields
    const customer = await Customer.create({
        name,
        email,
        phone,
        dealer: dealerId
    });

    return res.status(201).json(
        new ApiResponse(200, customer, "Customer created successfully")
    );
});


const updateCustomer = asyncHandler(async (req, res) => {
    const dealerId = req.dealer._id;
    const { customerId } = req.body;

    // Find customer
    const customer = await Customer.findOne({ 
        _id: customerId,
        dealer: dealerId 
    });

    if (!customer) {
        throw new ApiError(404, "Customer not found");
    }

    const { name, email, phone, address, gstNumber } = req.body;

    // Check if the new email already exists for this dealer (if provided)
    if (email) {
        const existingCustomer = await Customer.findOne({ 
            email,
            dealer: dealerId,
            _id: { $ne: customerId } 
        });
        if (existingCustomer) {
            throw new ApiError(400, "Email already in use");
        }
        customer.email = email;
    }

    // Update only provided fields
    if (name) customer.name = name;
    if (phone) customer.phone = phone;
    if (address) customer.address = address;
    if (gstNumber) customer.gstNumber = gstNumber;

    await customer.save();

    return res.status(200).json(
        new ApiResponse(200, customer, "Customer details updated successfully")
    );
});

const deleteCustomer =asyncHandler(async(req,res)=>{
    const dealerId = req.dealer._id;
    const { customerId } = req.body;
    const customer = await Customer.findOne({ 
        _id: customerId,
        dealer: dealerId 
    });

    if (!customer) {
        throw new ApiError(404, "Customer not found");
    }
    await Customer.findByIdAndDelete(customerId)
    return res.status(200).json(
        new ApiResponse(200, {}, "Dealer deleted successfully")
    );


})
export { createCustomer, updateCustomer,deleteCustomer };