/**
 * Command "interface"
 */
class Command
{
	/**
	 *  @param {Object} options - Additional command options
	 */
	constructor( options = {} )
	{
		this.options = options;
	}
	
	/**
	 * Execute this command
	 */
	execute() {}
}
module.exports = Command;
