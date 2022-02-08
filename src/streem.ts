import { init } from './config';
import { TokenBuilder } from './token_builder';

/**
 * Main Streem class.  Call Streem.init() to initialize.
 */
class Streem {
    public init = init;
    public TokenBuilder = TokenBuilder;
}

// Singleton export
export default new Streem();
