const mongoose = require('mongoose');
const ListItem = mongoose.model('listItems');

module.exports = app => {

  app.get('/api/add_new_item/:title', async (req, res) => {
    const existingItem = await ListItem.findOne({title: req.params.title});
    if(existingItem)
      res.send(existingItem);
    else {
      const newItem = await new ListItem({ title: req.params.title }).save();
      res.send(newItem);
    }
  });

  app.get('/api/get_all_items', async (req, res) => {
    const allItemsArr = await ListItem.find({}).sort({time_added: -1});
    res.send(allItemsArr);
  });

  app.get('/api/done/:id', async (req, res) => {
    // console.log(req.params.id);
    const resultFromDB = await ListItem.update({ _id: req.params.id }, { done: true});
    res.send('0');
  });

  app.get('/api/undone/:id', async (req, res) => {
    // console.log(req.params.id);
    const resultFromDB = await ListItem.update({ _id: req.params.id }, { done: false});
    res.send('0');
  });

  app.get('/api/archive/:id', async (req, res) => {
    // console.log(req.params.id);
    const resultFromDB = await ListItem.update({ _id: req.params.id }, { archived: true});
    res.send('0');
  });

  app.get('/api/unarchive/:id', async (req, res) => {
    // console.log(req.params.id);
    const resultFromDB = await ListItem.update({ _id: req.params.id }, { archived: false});
    res.send('0');
  });

  app.get('/api/delete/:id', async (req, res) => {
    // console.log(req.params.id);
    const resultFromDB = await ListItem.findOne({ _id: req.params.id }).remove();
    res.send('0');
  });

}
