const sinon = require('sinon');
const PostModel = require('../models/post.js');
const PostController = require('../controllers/postController.js');

describe('Post controller', () => {
    // Setup the responses
    let req = {
        body: {
            author: 'stswenguser',
            title: 'My first test post',
            content: 'Random content'
        }
    };

    let error = new Error({ error: 'Some error message' });

    let res = {};

    let expectedResult;

    
    describe('create', () => {
        var createPostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            createPostStub.restore();
        });


        it('should return the created post object', () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            createPostStub = sinon.stub(PostModel, 'create').yields(null, expectedResult);

            // Act
            PostController.addPost(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.create, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));

        });


        // Error Scenario
        it('should return status 500 on server error', () => {
            // Arrange
            createPostStub = sinon.stub(PostModel, 'create').yields(error);

            // Act
            PostController.addPost(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.create, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('update', () => {
        let req2 = {
            body: {
                id: '507blahhh',
                title: 'My first test post UPDATED WITH NEW VALUES',
                content: 'Random content UPDATED WITH NEW VALUES'
            }
        };
        var updatePostStub;

        beforeEach(() => {
            // before every test case setup
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            updatePostStub.restore();
        });

        it('returns the updated post object', () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            createPostStub = sinon.stub(PostModel, 'create').yields(null, expectedResult);

            // Act
            PostController.addPost(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.create, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));


            // Arrange
            expectedResult2 = {
                id: '507blahhh',
                title: 'My first test post UPDATED WITH NEW VALUES',
                content: 'Random content UPDATED WITH NEW VALUES',
            };

            updatePostStub = sinon.stub(PostModel, 'update').yields(null, expectedResult2);

            // Act
            PostController.updatePost(req2, res);

            // Assert
            sinon.assert.calledWith(PostModel.update, req2.body)
            sinon.assert.calledWith(res.json, sinon.match({ id: req2.body.id }));
            sinon.assert.calledWith(res.json, sinon.match({ title: req2.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req2.body.content }));
        });

        // Error Scenario
        it('returns status 500 on server error', () => {
            updatePostStub = sinon.stub(PostModel, 'update').yields(error);

            // Act
            PostController.updatePost(req2, res);

            // Assert
            sinon.assert.calledWith(PostModel.update, req2.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('delete', () => {
        let req2 = {
            body: {
                id: '507blahhh',
                title: 'My first test post',
                content: 'Random content'
            }
        };
        var deletePostStub;

        beforeEach(() => {
            // before every test case setup
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            deletePostStub.restore();
        });

        it('returns the deleted post object', () => {
            // Arrange
            expectedResult1 = {
                id: '507blahhh',
                title: 'My first test post',
                content: 'Random content'
            };

            deletePostStub = sinon.stub(PostModel, 'delete').yields(null, expectedResult1);

            // Act
            PostController.deletePost(req2, res);

            // Assert
            sinon.assert.calledWith(PostModel.delete, req2.body.id);
            sinon.assert.calledWith(res.json, sinon.match({ title: req2.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req2.body.content }));
        });

        // Error Scenario
        it('returns status 500 on server error', () => {
            deletePostStub = sinon.stub(PostModel, 'delete').yields(error);

            // Act
            PostController.deletePost(req2, res);

            // Assert
            sinon.assert.calledWith(PostModel.delete, req2.body.id);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });
});