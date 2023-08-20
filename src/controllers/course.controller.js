const getCourses = async (req, res) => {
  res.send('This will fetch all Courses');
};

const getCourse = async (req, res) => {
  res.send(`This corresponds to Course ${req.params.id}`);
};

const postCourse = async (req, res) => {
  res.send('Creating Course');
};

const updateCourse = async (req, res) => {
  res.send(`Updating Course ${req.params.id}`);
};

const deleteCourse = async (req, res) => {
  res.send(`Deleting Course ${req.params.id}`);
};

module.exports = {
  getCourses,
  getCourse,
  postCourse,
  updateCourse,
  deleteCourse,
};
