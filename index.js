import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const connectDB = require('./db.cjs');
const BusCompany = require('./BusCompany.cjs');
const AddBus = require('./addBus.cjs'); // Import the AddBus model
const Routes = require('./Route.cjs'); // Import the Routes model
const FAQ = require('./FAQ.cjs'); // Import the FAQ model
const User = require('./user.cjs'); // Import the User model
const Ticket = require('./Ticket.cjs'); // اضافه کردن مدل Ticket

const app = express();

app.use(cors()); // Use the CORS middleware
app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Server is ready!");
});

app.get("/user", (req, res) => {
  res.send("Hello World");
});

app.get("/hello", (req, res) => {
  res.send("This is Hello API");
});

// Endpoint to add a bus company
app.post("/add-bus-company", async (req, res) => {
  const { name, location, logo } = req.body;
  try {
    const busCompany = new BusCompany({ name, location, logo });
    await busCompany.save();
    res.status(201).send("Bus company added successfully");
  } catch (error) {
    res.status(400).send("Error adding bus company");
  }
});

// Endpoint to update a bus company
app.put("/bus-company/:id", async (req, res) => {
  const { id } = req.params;
  const { name, location, logo } = req.body;
  try {
    await BusCompany.findByIdAndUpdate(id, { name, location, logo });
    res.status(200).send("Bus company updated successfully");
  } catch (error) {
    res.status(400).send("Error updating bus company");
  }
});

// fetch bus companies
app.get("/bus-companies", async (req, res) => {
  try {
    const busCompanies = await BusCompany.find();
    res.status(200).json(busCompanies);
  } catch (error) {
    res.status(500).send("Error fetching bus companies");
  }
});

// Endpoint to delete a bus company
app.delete("/bus-company/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await BusCompany.findByIdAndDelete(id);
    res.status(200).send("Bus company deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting bus company");
  }
});

// Endpoint to add a bus
app.post("/add-bus", async (req, res) => {
  const { name, capicity, buscompany } = req.body;
  try {
    const bus = new AddBus({ name, capicity, buscompany });
    await bus.save();
    res.status(201).send("Bus added successfully");
  } catch (error) {
    res.status(400).send("Error adding bus");
  }
});

// Endpoint to update a bus
app.put("/bus/:id", async (req, res) => {
  const { id } = req.params;
  const { name, capicity, buscompany } = req.body;
  try {
    const bus = await AddBus.findByIdAndUpdate(id, { name, capicity, buscompany });
    if (!bus) {
      return res.status(404).send("Bus not found");
    }
    res.status(200).send("Bus updated successfully");
  } catch (error) {
    res.status(400).send("Error updating bus");
  }
});

// Endpoint to fetch all buses
app.get("/buses", async (req, res) => {
  try {
    const buses = await AddBus.find();
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).send("Error fetching buses");
  }
});

// Endpoint to delete a bus
app.delete("/bus/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await AddBus.findByIdAndDelete(id);
    res.status(200).send("Bus deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting bus");
  }
});

// Endpoint to fetch bus names for the dropdown
app.get("/bus-names", async (req, res) => {
  try {
    const buses = await AddBus.find({}, 'name buscompany'); // فقط نام اتوبوس‌ها را دریافت می‌کند
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).send("Error fetching bus names");
  }
});

// Endpoint to add a route
app.post("/add-route", async (req, res) => {
  const { from, to, duration, date, time, busname, image } = req.body;
  try {
    const route = new Routes({ from, to, duration, date, time, busname, image });
    await route.save();
    res.status(201).send("Route added successfully");
  } catch (error) {
    res.status(400).send("Error adding route");
  }
});

// Endpoint to update a route
app.put("/route/:id", async (req, res) => {
  const { id } = req.params;
  const { from, to, duration, date, time, busname, image } = req.body;
  try {
    const route = await Routes.findByIdAndUpdate(id, { from, to, duration, date, time, busname, image }, { new: true });
    if (!route) {
      return res.status(404).send("Route not found");
    }
    res.status(200).send("Route updated successfully");
  } catch (error) {
    res.status(400).send("Error updating route");
  }
});

// Endpoint to fetch all routes
app.get("/routes", async (req, res) => {
  try {
    const routes = await Routes.find();
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).send("Error fetching routes");
  }
});

// Endpoint to delete a route
app.delete("/route/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Routes.findByIdAndDelete(id);
    res.status(200).send("Route deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting route");
  }
});

// Endpoint to search routes
app.get("/search-routes", async (req, res) => {
  const { from, to, date } = req.query;
  try {
    const query = {};
    if (from) {
      query.from = from;
    }
    if (to) {
      query.to = to;
    }
    if (date) {
      query.date = date;
    }
    
    const routes = await Routes.find(query);

    // Update usageCount for each route
    await Promise.all(routes.map(async route => {
      route.usageCount += 1;
      await route.save();
    }));
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).send("Error fetching routes");
  }
});

// Endpoint to fetch top routes
app.get("/top-routes", async (req, res) => {
  try {
    const topRoutes = await Routes.find().sort({ usageCount: -1 }).limit(6);
    res.status(200).json(topRoutes);
  } catch (error) {
    res.status(500).send("Error fetching top routes");
  }
});

// Endpoint to add an FAQ
app.post("/add-faq", async (req, res) => {
  const { question, answer } = req.body;
  try {
    const faq = new FAQ({ question, answer });
    await faq.save();
    res.status(201).send("FAQ added successfully");
  } catch (error) {
    res.status(400).send("Error adding FAQ");
  }
});

// Endpoint to update an FAQ
app.put("/faq/:id", async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  try {
    const faq = await FAQ.findByIdAndUpdate(id, { question, answer }, { new: true });
    if (!faq) {
      return res.status(404).send("FAQ not found");
    }
    res.status(200).send("FAQ updated successfully");
  } catch (error) {
    res.status(400).send("Error updating FAQ");
  }
});

// Endpoint to fetch all FAQs
app.get("/faqs", async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).send("Error fetching FAQs");
  }
});

// Endpoint to delete an FAQ
app.delete("/faq/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await FAQ.findByIdAndDelete(id);
    res.status(200).send("FAQ deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting FAQ");
  }
});

// Endpoint to register a new user
app.post("/add-user", async (req, res) => {
  const { name, username, companyName, gender, contactNumber, role, address, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Encrypt the password
    const user = new User({ name, username, companyName, gender, contactNumber, role, address, email, password: hashedPassword });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(400).send("Error registering user");
  }
});

// Endpoint to update a user
app.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { name, username, companyName, gender, contactNumber, role, address, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Encrypt the password if provided
    const user = await User.findByIdAndUpdate(id, { name, username, companyName, gender, contactNumber, role, address, email, password: hashedPassword }, { new: true });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).send("User updated successfully");
  } catch (error) {
    res.status(400).send("Error updating user");
  }
});

// Endpoint to fetch all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
});

// Endpoint to delete a user
app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting user");
  }
});

// Endpoint to login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    res.status(200).json({ success: true, user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Endpoint برای رزرو بلیط
app.post("/book-ticket", async (req, res) => {
  const { passengerName, route, busName, seatNumber, date, time } = req.body;

  try {
    // بررسی اینکه آیا این صندلی در همان اتوبوس قبلاً رزرو شده است یا خیر
    const existingTicket = await Ticket.findOne({ busName, seatNumber, date });

    if (existingTicket) {
      // اگر صندلی رزرو شده باشد، پیام خطا ارسال می‌شود
      return res.status(400).json({ message: "This seat has already been booked." });
    }

    // اگر صندلی رزرو نشده باشد، بلیط جدید ایجاد و ذخیره می‌شود
    const ticket = new Ticket({ passengerName, route, busName, seatNumber, date, time });
    await ticket.save();
    res.status(201).send("Ticket booked successfully");
  } catch (error) {
    res.status(500).send("Error booking ticket");
  }
});

// Endpoint برای دریافت تمامی بلیط‌های بوک شده
app.get("/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find(); // همه بلیط‌ها را از پایگاه داده دریافت می‌کند
    res.status(200).json(tickets); // بلیط‌ها را در قالب JSON باز می‌گرداند
  } catch (error) {
    res.status(500).send("Error fetching tickets"); // در صورت بروز خطا پیام مناسب را ارسال می‌کند
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
