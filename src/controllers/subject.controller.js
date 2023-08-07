export const getSubjects = async (req, res) => {
  res.send("This will fetch all Subjects")
}

export const getSubject = async (req, res) => {
  res.send(`This corresponds to subject ${req.params.id}`)
}

export const postSubject = async (req, res) => {
  res.send(`Creating subject`)
}

export const updateSubject = async (req, res) => {
  res.send(`Updating subject ${req.params.id}`)
}


export const deleteSubject = async (req, res) => {
  res.send(`Deleting subject ${req.params.id}`)
}
