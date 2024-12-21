import { defineQuery } from "next-sanity";

export const STARTUP_QUERY = defineQuery(
	`*[_type == "startup" && defined(slug.current) && 
		!defined($search) || category match $search || title match $search || author->name match $search] | order(_createdAt desc)
	{
		_id,
		title,
		slug,
		_createdAt,
		author -> {
			_id, username, image, bio
		},
		view,
		description,
		category,
		image,
	}`
);

export const STARTUP_BY_ID_QUERY = defineQuery(
	`*[_type == "startup" && _id == $id][0]{
		_id,
		title,
		slug,
		_createdAt,
		author -> {
			_id, name, username, image, bio
		},
		view,
		description,
		category,
		image,
		pitch
	}`
);

export const STARTUP_VIEWS_QUERY = defineQuery(
	`*[_type == 'startup' && _id == $id][0]{
		_id, views	
	}`
);