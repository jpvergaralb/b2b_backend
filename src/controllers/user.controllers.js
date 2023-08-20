const getUsers = async (req, res) => {
  res.send('This will fetch all users');
};

const getUser = async (req, res) => {
  res.send(
    { response: `This corresponds to user ${req.params.id}` },
  );
};

const postUser = async (req, res) => {
  res.send('Creating user');
};

const updateUser = async (req, res) => {
  res.send(`Updating user ${req.params.id}`);
};

const deleteUser = async (req, res) => {
  res.send(`Deleting user ${req.params.id}`);
};

module.exports = {
  getUsers,
  getUser,
  postUser,
  updateUser,
  deleteUser,
};
