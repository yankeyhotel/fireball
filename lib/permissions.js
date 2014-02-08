// check that the userId specified owns the documents
ownDocument = function(userId, doc) {
	return doc && doc.userId === userId;
}