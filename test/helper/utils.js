var utils = {
  prepare4reveals: function(accounts, target_block) {
    var randao = Randao.at(Randao.deployed_address);
    var zerostr = new Array(64).fill('0').join('');
    var secrets = ['a', '12~', '%b', 'g???'].map((s) => { return '0x' + (zerostr + web3.toHex(s).substr(2)).substr(-64, 64); });
    var height = target_block || web3.eth.blockNumber + 10;

    var commitments = secrets.map((s) => { return '0x' + web3.sha3(s); });

    var promise  = Promise.all(
      commitments.map((commitment, i) => {
        return randao.commit(height, commitment, {value: web3.toWei('10', 'ether'), from: accounts[i]});
    }));
    return [randao, secrets, height, promise];
  }
}

module.exports = utils;
