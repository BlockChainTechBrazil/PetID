# 🐾 Pet ID — Smart Identity for Pets on the Blockchain

Pet ID is a decentralized identification and data management platform for pets, built on blockchain technology. It was created to solve a critical gap in pet care and animal rights: the lack of secure, accessible, and permanent records for animals throughout their lives — regardless of location, vet clinic, or ownership history.

By leveraging blockchain's core properties — immutability, transparency, and decentralization — Pet ID enables each animal to receive a unique, lifelong digital identity that stores vital data such as health history, ownership changes, and optional location tracking.

## 🌱 Why Pet ID Is Needed

Millions of animals lack traceable records, leading to problems in emergency treatment, legal ownership, and public health monitoring. Abandonment, loss, and mismanagement are worsened by fragmented, inaccessible data. Today's systems are centralized, vulnerable to loss, and regionally limited — Pet ID changes that.

## 🔗 What Makes Pet ID Revolutionary

### 🧬 Digital DNA for Every Pet
Each animal receives a "Digital CPF" — a blockchain-based identity that includes physical features, medical records, and legal ownership, creating a tamper-proof and portable pet passport.

### 🔐 Decentralized and Auditable Records
All health, property, and event data are recorded on-chain, accessible only through authorized channels, and protected by smart contracts for full traceability and data integrity.

### 📲 Universal Access and Real-Time Syncing
Tied to a mobile and web-based interface, Pet ID allows veterinarians, NGOs, and pet owners to access and update records securely, with support for biometric login and 2FA.

### 🛠️ Smart Ownership Transfers
Adoptions and changes in ownership are handled via smart contracts — secure, auditable, and instant — encouraging responsible pet guardianship and reducing fraud.

### 🏛 Public Infrastructure Support
Pet ID empowers municipalities, animal control, and shelters with actionable data for vaccination campaigns, population control, and public policy.

## 👥 Who Pet ID Is For

- 🐕 **Pet owners** seeking protection and continuity for their animals' history
- 🏥 **Veterinary clinics** needing fast, secure access to reliable medical data
- 🐾 **NGOs and shelters** managing rescues, adoptions, and animal records
- 🏛 **Governments** implementing modern, data-driven animal care policies

## 🧩 Scalable Web3 Infrastructure

- 🌐 Built on scalable public blockchains (Polygon, Avalanche, Ethereum L2)
- 🔐 Smart contracts manage permissions, validation, and record updates
- 🔄 Open APIs allow integration with public and private systems
- 📱 Secure mobile/web UI with biometric login and decentralized IDs
- 🗳️ Community-driven governance enabled by proof-of-authority or token voting


## 🚀 Key Use Cases

- 🏥 **Emergency care**: Instant access to medical history at any clinic
- 📍 **Lost pet recovery**: Location and ownership verification via Pet ID
- ✈️ **Travel**: Validated digital documents for cross-border transport
- 🤝 **Adoption**: Trustless ownership transfers between parties
- 🧬 **Public health**: Sanitary and genetic control through audit-ready data
- 💉 **Vaccination records**: All vaccine doses and dates are registered on-chain, accessible by authorized parties
- 🩺 **Medical records**: Consultations, treatments, and exams are stored securely and permanently for each pet

## 💡 Social Impact

- 🐾 Reduction in pet abandonment through universal traceability
- 💉 Improved animal health via real-time medical record sharing
- 🌐 Easier implementation of pet-related public health policies
- 🤝 Stronger collaboration between owners, NGOs, and governments
- 📊 Generation of structured data for research, breeding, and epidemiology


### Installation

1. Clone the repository:
```bash
git clone https://github.com/davimqz/PetID.git
cd PetID
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`


## 🩺 Medical & Vaccine Records (Planned/Experimental)

The smart contract will support:

- **Vaccine Records**: Each pet will have an array of vaccine records (name, date, details)
- **Medical Records**: Each pet will have an array of medical records (description, date, veterinarian)

These will be managed by new functions in the same PetID contract, so all pet data remains unified and easy to query.

**Example Solidity additions:**

```solidity
struct VaccineRecord {
    string name;
    uint256 date;
    string details;
}

struct MedicalRecord {
    string description;
    uint256 date;
    string veterinarian;
}

mapping(uint256 => VaccineRecord[]) public petVaccines;
mapping(uint256 => MedicalRecord[]) public petMedicalRecords;

function addVaccine(uint256 petId, string memory name, uint256 date, string memory details) public onlyPetOwner(petId) {
    petVaccines[petId].push(VaccineRecord(name, date, details));
}

function addMedicalRecord(uint256 petId, string memory description, uint256 date, string memory veterinarian) public onlyPetOwner(petId) {
    petMedicalRecords[petId].push(MedicalRecord(description, date, veterinarian));
}
```

> **Note:** All new features will be added to the main contract for simplicity and unified access. If the project grows, modularization can be considered.

---

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

For questions or support, please reach out to the development team.

---

*Building a better future for pets through blockchain technology* 🐾
