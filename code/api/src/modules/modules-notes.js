// This file is for notes about modules for new tables we'll be adding

// Will need to add a directory for cratePoduct and for delivery within this directory
// Each sub-directory will include: model, mutations, query, resolvers, and types
// Within types folder will need to detail all the new columns added as well as the
// associations(relationships) to other tables (details below).

// crateProduct (new joins table)
// crateID (integer--foreign key)
// productID (integer--foreign key)

// crateProduct.associate relationships:
// crateProduct belongsTo product
// crateProduct belongsTo crate
// crateProduct hasMany deliveries

// delivery (new joins table)
// status (integer)
// userId (integer--foreign key)
// crateProductId (integer--foreign key)

// An admin would change the status of a delivery. When it goes out
// from the warehouse it would default to pending and then when the
// crate is sent back the admin would update the status of each record
// the correlates to a crateProductId as kept or returned to be able to
// charge the customer appropriately.
// 0 = ‘pending’
// 1 = ‘kept’
// 2 = ‘returned’

// delivery.associate relationships:
// delivery belongsTo crateProduct
// delivery belongsTo user
