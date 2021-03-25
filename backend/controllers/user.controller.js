exports.allAccess = (req, res) => {
    res.status(200).send("Log in pour connexion.");
  };
  
exports.userBoard = (req, res) => {
  res.status(200).send("Bienvenue sur l'espace utilisateur.");
};
  
exports.adminBoard = (req, res) => {
  res.status(200).send("Bienvenue sur l'espace administrateur.");
};
  
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};