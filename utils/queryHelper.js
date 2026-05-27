exports.applyPagination = (
    query,
    queryParams,
    
) => {
    const page = parseInt(queryParams.page) || 1;

    const limit = parseInt(queryParams.limit) || 20;

    if(limit > 100){
        limit = 100;
    }

    const skip = (page - 1)* limit;

    return query.skip(skip).limit(limit);

}

exports.buildPaginationMeta = (
    totalCount,
    page,
    limit
) => {
    const totalPages = Math.ceil(totalCount / limit);
    return{
        total : totalCount,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
    };
};