-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);
