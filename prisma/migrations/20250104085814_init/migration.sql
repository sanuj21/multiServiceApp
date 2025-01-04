-- AlterTable
ALTER TABLE "comment_service.comments" ADD COLUMN     "parentId" INTEGER;

-- AddForeignKey
ALTER TABLE "comment_service.comments" ADD CONSTRAINT "comment_service.comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "comment_service.comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
