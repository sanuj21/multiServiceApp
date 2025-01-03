/*
  Warnings:

  - You are about to drop the `blog_service.users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comment_service.users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "blog_service.users";

-- DropTable
DROP TABLE "comment_service.users";

-- CreateTable
CREATE TABLE "blog_service.blogs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blog_service.blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment_service.comments" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_service.comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "blog_service.blogs" ADD CONSTRAINT "blog_service.blogs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user_service.users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_service.comments" ADD CONSTRAINT "comment_service.comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "blog_service.blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_service.comments" ADD CONSTRAINT "comment_service.comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user_service.users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
