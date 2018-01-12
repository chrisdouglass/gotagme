const express = require('express');
const router = express.Router();

/* TODO: Implement DB!
 * Here is a potential structure. I spent like 3-3:45am brainstorming fields needed to hold all of
 * the data I'd like to store for the MVP as well as a bunch of subsequent features.
 * 
 * Defining all of the fields is easy. The unit tests are tedious. Is it neccessary to test fields
 * that aren't dynamically calculated?
 *
 * Costume
 *    id
 *    String name
 *    Photo icon
 *    List Photo profile_photos
 *    Species species
 *    Number debut_year
 *    ConventionYear debut_convention_year
 *    List CostumeOwner owners (ordered by date_obtained)
 *    List User creators
 *    List Photo photos
 *    List User liked_by_users
 *    List Costume related_costumes
 *    User added_by_user
 *    Costume succeesor_costume
 * User
 *    id
 *    String name
 *    Photo icon (could also be auto-based on order of owned suits)
 *    List Costume created_costumes (ordered by debut_year)
 *    List Costume owned_costumes
 *    List Collection owned_collections
 *    List Photo added_photos
 *    List Photo created_photos
 *    List Costume added_costumes
 *    ??? (twitter userinfo)
 *    ??? (flickr userinfo)
 * CostumeOwner
 *    Costume costume
 *    User owner
 *    Date date_obtained
 *    Number sale_price
 * Photo
 *    id
 *    String remote_url
 *    String local_url
 *    Enum source (Twitter, flickr, etc)
 *    User added_by_user
 *    User created_by_user
 *    List Tag tags
 *    List Costume costumes
 *    List Collection collections
 *    List User liked_by_users
 *    ConventionYear convention_year (or inherit from collection if not null...?)
 * Collection
 *    id
 *    String name
 *    String remote_url
 *    List Photo photos
 *    ConventionYear convention_year
 *    User owner
 * Tag
 *    id
 *    String tag
 *    List Photo photos
 * Convention (Should this table have a row per year of the convention instead of the other table?)
 *    id
 *    String name
 *    List ConventionYear convention_years
 * ConventionYear (Remove if this pair be referenced without a separate object for it)
 *    Convention convention
 *    Number year
 * Species
 *    id
 *    String name
 *    Family family
 * Family
 *    id
 *    String name
 *    List Species species_list
 */

module.exports = router;
