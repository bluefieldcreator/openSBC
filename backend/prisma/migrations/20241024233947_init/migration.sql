-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'blank',
    "bio" TEXT NOT NULL DEFAULT 'New user',
    "feed" TEXT NOT NULL DEFAULT 'Just joined',
    "Status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
