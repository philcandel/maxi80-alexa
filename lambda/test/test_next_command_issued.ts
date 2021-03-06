'use strict';

import 'mocha';
import { expect } from 'chai';
import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { handler as skill } from '../src';

import r from './request/next_command_issued.json'; 
const request: RequestEnvelope = <RequestEnvelope>r;

import { Assertion } from './utils/Assertion';
const A = new Assertion();

const USER_ID = "amzn1.ask.account.123";
let skill_response: ResponseEnvelope;

describe('Audio Player Test : Next Command Issued', function () {

  // pre-requisites
  before(() => {

    this.timeout(5000);

    return new Promise((resolve, reject) => {
        skill(request, null, (error, responseEnvelope) => {
          skill_response = responseEnvelope;
          resolve();
        });
      });
  });
  it('it responses with valid response structure ', () => {

    A.checkResponseStructure(skill_response);
  }),

  it('it responses with no output speech ', () => {

    expect(skill_response).to.have.property("response");
    let r = skill_response.response;

    expect(r).to.not.have.property("outputSpeech");

  }),

  // as per https://developer.amazon.com/docs/custom-skills/audioplayer-interface-reference.html#playbackfailed
  it('it responses with no card ', () => {

    expect(skill_response).to.have.property("response");
    let r = skill_response.response;

    expect(r).to.not.have.property("card");

  }),


  it('it responses with an audio directive ', () => {

    A.checkNoAudioDirective(skill_response);

  });
});