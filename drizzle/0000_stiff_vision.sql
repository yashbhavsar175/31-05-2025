CREATE TABLE "link_view" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" varchar(500) NOT NULL,
	"title" varchar(500) NOT NULL,
	"favicon_url" varchar(255) NOT NULL,
	"fetched_at" varchar(255) NOT NULL,
	CONSTRAINT "link_view_url_unique" UNIQUE("url")
);
