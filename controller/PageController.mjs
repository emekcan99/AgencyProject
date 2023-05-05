import Project from "../models/Project.mjs"


export const getIndexPage = (req,res) => {
    res.render("index")
}

export const getServicesPage = (req,res) => {
    res.render("services")
}

export const updatePage = async (req,res) => {

    let project = await Project.findById(req.params.id)

    res.render("update",{
        project:project
    })
    
}