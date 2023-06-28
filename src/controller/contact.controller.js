const Contact = require("../schema/contact.chema")

const contactController = {
    async getContact(req, res) {
        try {
            const contacts = await Contact.find({})
            res.status(200).json(contacts)
        } catch (error) {
            console.log(error)
        }
    },
    async getContactDateOnly(req, res) {
        try {
            const contacts = await Contact.find({})
            const formattedContacts = contacts.map(contact => {
                const createdAt = contact.createdAt;
                const date = createdAt.toLocaleDateString('en-GB');
                return { ...contact._doc, createdAt: date };
            });
            res.status(200).json(formattedContacts)

        } catch (error) {
            console.log(error)

        }
    },

    async createNewContact(req, res) {
        try {
            const data = req.body
            const fullname = data.firstName + ' ' + data.lastName
            const contact = await Contact.create({
                name: fullname,
                email: data.email,
                subject: data.subject,
                message: data.message
            })
            res.status(200).json({ message: "Create success", contact })
        } catch (error) {
            console.log(error)
        }
    },

    async deleteContact(req, res) {
        try {
            const id = req.params.id
            await Contact.findByIdAndDelete({ _id: id })
            res.status(200).json({ message: "Delete success" });
        } catch (error) {
            console.log(error)

        }
    }


}

module.exports = contactController