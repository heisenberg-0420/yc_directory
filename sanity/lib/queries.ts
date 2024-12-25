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

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(
	`*[_type == 'author' && id == $id][0]{
		_id,
		id,
		name,
		username,
		email,
		image,
		bio	
	}`
);

export const AUTHOR_BY_ID_QUERY = defineQuery(
	`*[_type == 'author' && _id == $id][0]{
		_id,
		id,
		name,
		username,
		email,
		image,
		bio	
	}`
);

export const STARTUPS_BY_AUTHOR_QUERY = defineQuery(
	`*[_type == "startup" && author._ref == $id] | order(_createdAt desc)
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

export const PLAYLiST_BY_SLUG_QUERY = defineQuery(
	`*[_type == "playlist" && slug.current == $slug][0]
	{
		_id,
		title,
		slug,
		select[]->{
			_id,
			_createdAt,
			title,
			slug,
			author->{
				_id,
				name,
				slug,
				image,
				bio	
			},
			view,
			description,
			image,
			category,
			pitch
		}
	}`
);