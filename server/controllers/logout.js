async function logout(req, res) {
  try {
    const cookiesOptions = {
      http: true,
      secure: true,
    };

    return res
      .cookie('token', '', cookiesOptions)
      .status(200)
      .json({message: 'session out', success: true});
  } catch (error) {
    return res.status(500).json({message: error.message || error, error: true});
  }
}

module.exports = logout;
