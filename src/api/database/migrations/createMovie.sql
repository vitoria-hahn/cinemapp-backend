CREATE TABLE IF NOT EXISTS movie(
    ID UUID PRIMARY KEY,
    Title VARCHAR(),
    Year VARCHAR(),
    Genre VARCHAR(),
    Director VARCHAR(),
    Minutes VARCHAR(),
    ImdbScore VARCHAR(),
    Summary TEXT()
);