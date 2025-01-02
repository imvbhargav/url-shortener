/*
  Warnings:

  - A unique constraint covering the columns `[original]` on the table `ShortUrl` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ShortUrl_original_key" ON "ShortUrl"("original");
