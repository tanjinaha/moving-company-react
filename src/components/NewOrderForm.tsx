// Importing Card components from Shadcn for layout
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";




// This is the main React component to create a new order form
export default function NewOrderForm() {
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerEmail, setCustomerEmail] = useState(""); // 📧 Email
    const [consultantName, setConsultantName] = useState(""); // 🧑‍💼 Consultant
    const [consultantPhone, setConsultantPhone] = useState(""); // 📞 Consultant Phone
    const [consultantEmail, setConsultantEmail] = useState(""); // 📧 Consultant Email
    const [serviceType, setServiceType] = useState(""); // 🧭 Type of service: moving, packing, etc.
    const [fromAddress, setFromAddress] = useState(""); // 📦 Move from address
    const [toAddress, setToAddress] = useState(""); // 📦 Move to address
    const [scheduleDate, setScheduleDate] = useState(""); // 🗓️ Scheduled date
    const [price, setPrice] = useState(""); // 💰 Price of the service
    const [note, setNote] = useState(""); // 📝 Optional note for the order

    return (
        // Outer padding for spacing
        <div className="p-6">

            {/* Main container styled like a card (light blue background, rounded, etc.) */}
            <Card className="bg-blue-50 border-blue-300">

                {/* Top part of the card: title + short text */}
                <CardHeader>
                    <CardTitle>🆕 Create New Order</CardTitle> {/* Big bold title */}
                    <CardDescription>Fill in the details below to create a new order.</CardDescription> {/* Small subtitle */}
                </CardHeader>

                {/* Middle part: we will put our input fields here (like customer name, price, etc.) */}
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">

            // 👤 Customer Name Input Section
                    <div className="flex flex-col gap-1">
                        {/* Label shown above the input box — tells the user what to type */}
                        <label htmlFor="customerName" className="text-sm font-medium">
                            Customer Name
                        </label>

                        {/* Input field where user types the new customer name */}
                        <Input
                            id="customerName"                      // Helps match the label to this box
                            placeholder="Enter customer name"     // Light gray hint inside the box
                            value={customerName}                  // Shows the current value from React state
                            onChange={(e) => setCustomerName(e.target.value)}
                        // Updates the value when the user types
                        />
                    </div>
                    {/* 📞 Customer Phone Input Section */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="customerPhone" className="text-sm font-medium">
                            Customer Phone
                        </label>
                        <Input
                            id="customerPhone"
                            placeholder="Enter phone number"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                        />
                    </div>
                    {/* 📧 Customer Email Input Section */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="customerEmail" className="text-sm font-medium">
                            Customer Email
                        </label>
                        <Input
                            id="customerEmail"
                            placeholder="Enter email address"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                        />
                    </div>
                    {/* 🧑‍💼 Sales Consultant Name Input Section */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="consultantName" className="text-sm font-medium">
                            Consultant Name
                        </label>
                        <Input
                            id="consultantName"
                            placeholder="Enter consultant name"
                            value={consultantName}
                            onChange={(e) => setConsultantName(e.target.value)}
                        />
                    </div>
                    {/* 📞 Consultant Phone Input Section */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="consultantPhone" className="text-sm font-medium">
                            Consultant Phone
                        </label>
                        <Input
                            id="consultantPhone"
                            placeholder="Enter consultant phone"
                            value={consultantPhone}
                            onChange={(e) => setConsultantPhone(e.target.value)}
                        />
                    </div>
                    {/* 📧 Consultant Email Input Section */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="consultantEmail" className="text-sm font-medium">
                            Consultant Email
                        </label>
                        <Input
                            id="consultantEmail"
                            placeholder="Enter consultant email"
                            value={consultantEmail}
                            onChange={(e) => setConsultantEmail(e.target.value)}
                        />
                    </div>
                    {/* 🧭 Service Type Input Section */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="serviceType" className="text-sm font-medium">
                            Service Type
                        </label>
                        <Input
                            id="serviceType"
                            placeholder="Enter service type (e.g., Moving, Packing)"
                            value={serviceType}
                            onChange={(e) => setServiceType(e.target.value)}
                        />
                    </div>
                    {/* 📦 From Address Input Section */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="fromAddress" className="text-sm font-medium">
                            From Address
                        </label>
                        <Input
                            id="fromAddress"
                            placeholder="Enter pickup address"
                            value={fromAddress}
                            onChange={(e) => setFromAddress(e.target.value)}
                        />
                    </div>
                    {/* 📦 To Address Input Section */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="toAddress" className="text-sm font-medium">
                            To Address
                        </label>
                        <Input
                            id="toAddress"
                            placeholder="Enter delivery address"
                            value={toAddress}
                            onChange={(e) => setToAddress(e.target.value)}
                        />
                    </div>

                    {/* 🗓️ Schedule Date Input Section */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="scheduleDate" className="text-sm font-medium">
                            Schedule Date
                        </label>
                        <Input
                            id="scheduleDate"
                            type="date"  // Date picker
                            value={scheduleDate}
                            onChange={(e) => setScheduleDate(e.target.value)}
                        />
                    </div>

                    {/* 💰 Price Input Section */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="price" className="text-sm font-medium">
                            Price (in NOK)
                        </label>
                        <Input
                            id="price"
                            type="number"                                // Only numbers allowed
                            placeholder="Enter price in NOK"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}  // Update state
                        />
                    </div>
                    {/* 📝 Note Input Section */}
                    <div className="flex flex-col gap-1 md:col-span-2">
                        <label htmlFor="note" className="text-sm font-medium">
                            Note
                        </label>
                        <Input
                            id="note"
                            placeholder="Enter any special notes (optional)"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>


                    {/* INPUT FIELDS WILL GO HERE NEXT */}
                </CardContent>

                {/* Bottom part: action buttons */}
                <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button> {/* Outlined style */}
                    <Button>Save Order</Button>              {/* Filled style */}
                </CardFooter>
            </Card>
        </div>
    );
}
