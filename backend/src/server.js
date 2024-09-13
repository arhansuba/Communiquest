const express = require('express');
const cors = require('cors');
const questRoutes = require('./routes/quests');
const governanceRoutes = require('./routes/governance');
const nftRoutes = require('./routes/nfts');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/quests', questRoutes);
app.use('/api/governance', governanceRoutes);
app.use('/api/nfts', nftRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));