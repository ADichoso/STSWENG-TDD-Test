//import { addPost } from "./postController";
//import { jest } from "@jest/globals";
const sinon = require('sinon');
const PostModel = require('../models/post');
const PostController = require('../controllers/postController');

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

    describe('update', () => {
        let req2 = {
            body: {
                author: 'stswenguserUPDATED',
                title: 'My first UPDATED test post',
                content: 'Random content UPDATED'
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
                _id: '507blahhh', // place valid post if
                title: 'my first updated test',
                content: 'random content updated',
                author: 'stswenguserUPDATED',
                date: Date.now()
            };

            updatePostStub = sinon.stub(PostModel, 'updatePost').yields(null, expectedResult);

            // Act
            PostController.update(req2, res);

            // Assert
            sinon.assert.calledWith(PostModel.updatePost, req2.body)
            sinon.assert.calledWith(res.json, sinon.match({ title: req2.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req2.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req2.body.author }));
        });

        // Error Scenario
        it('returns status 500 on server error', () => {
            updatePostStub = sinon.stub(PostModel, 'updatePost').yields(error);

            // Act
            PostController.update(req2, res);

            // Assert
            sinon.assert.calledWith(PostModel.updatePost, req2.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });
});