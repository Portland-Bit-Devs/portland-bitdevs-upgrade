"use strict";
exports.id = 451;
exports.ids = [451];
exports.modules = {

/***/ 6675:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.ContextAPI = void 0;
const NoopContextManager_1 = __webpack_require__(4930);
const global_utils_1 = __webpack_require__(2593);
const diag_1 = __webpack_require__(296);
const API_NAME = "context";
const NOOP_CONTEXT_MANAGER = new NoopContextManager_1.NoopContextManager();
/**
 * Singleton object which represents the entry point to the OpenTelemetry Context API
 */ class ContextAPI {
    /** Empty private constructor prevents end users from constructing a new instance of the API */ constructor(){}
    /** Get the singleton instance of the Context API */ static getInstance() {
        if (!this._instance) {
            this._instance = new ContextAPI();
        }
        return this._instance;
    }
    /**
     * Set the current context manager.
     *
     * @returns true if the context manager was successfully registered, else false
     */ setGlobalContextManager(contextManager) {
        return (0, global_utils_1.registerGlobal)(API_NAME, contextManager, diag_1.DiagAPI.instance());
    }
    /**
     * Get the currently active context
     */ active() {
        return this._getContextManager().active();
    }
    /**
     * Execute a function with an active context
     *
     * @param context context to be active during function execution
     * @param fn function to execute in a context
     * @param thisArg optional receiver to be used for calling fn
     * @param args optional arguments forwarded to fn
     */ with(context, fn, thisArg, ...args) {
        return this._getContextManager().with(context, fn, thisArg, ...args);
    }
    /**
     * Bind a context to a target function or event emitter
     *
     * @param context context to bind to the event emitter or function. Defaults to the currently active context
     * @param target function or event emitter to bind
     */ bind(context, target) {
        return this._getContextManager().bind(context, target);
    }
    _getContextManager() {
        return (0, global_utils_1.getGlobal)(API_NAME) || NOOP_CONTEXT_MANAGER;
    }
    /** Disable and remove the global context manager */ disable() {
        this._getContextManager().disable();
        (0, global_utils_1.unregisterGlobal)(API_NAME, diag_1.DiagAPI.instance());
    }
}
exports.ContextAPI = ContextAPI; //# sourceMappingURL=context.js.map


/***/ }),

/***/ 296:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.DiagAPI = void 0;
const ComponentLogger_1 = __webpack_require__(8707);
const logLevelLogger_1 = __webpack_require__(4429);
const types_1 = __webpack_require__(9763);
const global_utils_1 = __webpack_require__(2593);
const API_NAME = "diag";
/**
 * Singleton object which represents the entry point to the OpenTelemetry internal
 * diagnostic API
 */ class DiagAPI {
    /**
     * Private internal constructor
     * @private
     */ constructor(){
        function _logProxy(funcName) {
            return function(...args) {
                const logger = (0, global_utils_1.getGlobal)("diag");
                // shortcut if logger not set
                if (!logger) return;
                return logger[funcName](...args);
            };
        }
        // Using self local variable for minification purposes as 'this' cannot be minified
        const self = this;
        // DiagAPI specific functions
        const setLogger = (logger, optionsOrLogLevel = {
            logLevel: types_1.DiagLogLevel.INFO
        })=>{
            var _a, _b, _c;
            if (logger === self) {
                // There isn't much we can do here.
                // Logging to the console might break the user application.
                // Try to log to self. If a logger was previously registered it will receive the log.
                const err = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                self.error((_a = err.stack) !== null && _a !== void 0 ? _a : err.message);
                return false;
            }
            if (typeof optionsOrLogLevel === "number") {
                optionsOrLogLevel = {
                    logLevel: optionsOrLogLevel
                };
            }
            const oldLogger = (0, global_utils_1.getGlobal)("diag");
            const newLogger = (0, logLevelLogger_1.createLogLevelDiagLogger)((_b = optionsOrLogLevel.logLevel) !== null && _b !== void 0 ? _b : types_1.DiagLogLevel.INFO, logger);
            // There already is an logger registered. We'll let it know before overwriting it.
            if (oldLogger && !optionsOrLogLevel.suppressOverrideMessage) {
                const stack = (_c = new Error().stack) !== null && _c !== void 0 ? _c : "<failed to generate stacktrace>";
                oldLogger.warn(`Current logger will be overwritten from ${stack}`);
                newLogger.warn(`Current logger will overwrite one already registered from ${stack}`);
            }
            return (0, global_utils_1.registerGlobal)("diag", newLogger, self, true);
        };
        self.setLogger = setLogger;
        self.disable = ()=>{
            (0, global_utils_1.unregisterGlobal)(API_NAME, self);
        };
        self.createComponentLogger = (options)=>{
            return new ComponentLogger_1.DiagComponentLogger(options);
        };
        self.verbose = _logProxy("verbose");
        self.debug = _logProxy("debug");
        self.info = _logProxy("info");
        self.warn = _logProxy("warn");
        self.error = _logProxy("error");
    }
    /** Get the singleton instance of the DiagAPI API */ static instance() {
        if (!this._instance) {
            this._instance = new DiagAPI();
        }
        return this._instance;
    }
}
exports.DiagAPI = DiagAPI; //# sourceMappingURL=diag.js.map


/***/ }),

/***/ 1718:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.MetricsAPI = void 0;
const NoopMeterProvider_1 = __webpack_require__(8978);
const global_utils_1 = __webpack_require__(2593);
const diag_1 = __webpack_require__(296);
const API_NAME = "metrics";
/**
 * Singleton object which represents the entry point to the OpenTelemetry Metrics API
 */ class MetricsAPI {
    /** Empty private constructor prevents end users from constructing a new instance of the API */ constructor(){}
    /** Get the singleton instance of the Metrics API */ static getInstance() {
        if (!this._instance) {
            this._instance = new MetricsAPI();
        }
        return this._instance;
    }
    /**
     * Set the current global meter provider.
     * Returns true if the meter provider was successfully registered, else false.
     */ setGlobalMeterProvider(provider) {
        return (0, global_utils_1.registerGlobal)(API_NAME, provider, diag_1.DiagAPI.instance());
    }
    /**
     * Returns the global meter provider.
     */ getMeterProvider() {
        return (0, global_utils_1.getGlobal)(API_NAME) || NoopMeterProvider_1.NOOP_METER_PROVIDER;
    }
    /**
     * Returns a meter from the global meter provider.
     */ getMeter(name, version, options) {
        return this.getMeterProvider().getMeter(name, version, options);
    }
    /** Remove the global meter provider */ disable() {
        (0, global_utils_1.unregisterGlobal)(API_NAME, diag_1.DiagAPI.instance());
    }
}
exports.MetricsAPI = MetricsAPI; //# sourceMappingURL=metrics.js.map


/***/ }),

/***/ 9276:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.PropagationAPI = void 0;
const global_utils_1 = __webpack_require__(2593);
const NoopTextMapPropagator_1 = __webpack_require__(4226);
const TextMapPropagator_1 = __webpack_require__(205);
const context_helpers_1 = __webpack_require__(1225);
const utils_1 = __webpack_require__(8467);
const diag_1 = __webpack_require__(296);
const API_NAME = "propagation";
const NOOP_TEXT_MAP_PROPAGATOR = new NoopTextMapPropagator_1.NoopTextMapPropagator();
/**
 * Singleton object which represents the entry point to the OpenTelemetry Propagation API
 */ class PropagationAPI {
    /** Empty private constructor prevents end users from constructing a new instance of the API */ constructor(){
        this.createBaggage = utils_1.createBaggage;
        this.getBaggage = context_helpers_1.getBaggage;
        this.getActiveBaggage = context_helpers_1.getActiveBaggage;
        this.setBaggage = context_helpers_1.setBaggage;
        this.deleteBaggage = context_helpers_1.deleteBaggage;
    }
    /** Get the singleton instance of the Propagator API */ static getInstance() {
        if (!this._instance) {
            this._instance = new PropagationAPI();
        }
        return this._instance;
    }
    /**
     * Set the current propagator.
     *
     * @returns true if the propagator was successfully registered, else false
     */ setGlobalPropagator(propagator) {
        return (0, global_utils_1.registerGlobal)(API_NAME, propagator, diag_1.DiagAPI.instance());
    }
    /**
     * Inject context into a carrier to be propagated inter-process
     *
     * @param context Context carrying tracing data to inject
     * @param carrier carrier to inject context into
     * @param setter Function used to set values on the carrier
     */ inject(context, carrier, setter = TextMapPropagator_1.defaultTextMapSetter) {
        return this._getGlobalPropagator().inject(context, carrier, setter);
    }
    /**
     * Extract context from a carrier
     *
     * @param context Context which the newly created context will inherit from
     * @param carrier Carrier to extract context from
     * @param getter Function used to extract keys from a carrier
     */ extract(context, carrier, getter = TextMapPropagator_1.defaultTextMapGetter) {
        return this._getGlobalPropagator().extract(context, carrier, getter);
    }
    /**
     * Return a list of all fields which may be used by the propagator.
     */ fields() {
        return this._getGlobalPropagator().fields();
    }
    /** Remove the global propagator */ disable() {
        (0, global_utils_1.unregisterGlobal)(API_NAME, diag_1.DiagAPI.instance());
    }
    _getGlobalPropagator() {
        return (0, global_utils_1.getGlobal)(API_NAME) || NOOP_TEXT_MAP_PROPAGATOR;
    }
}
exports.PropagationAPI = PropagationAPI; //# sourceMappingURL=propagation.js.map


/***/ }),

/***/ 9067:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.TraceAPI = void 0;
const global_utils_1 = __webpack_require__(2593);
const ProxyTracerProvider_1 = __webpack_require__(7784);
const spancontext_utils_1 = __webpack_require__(5826);
const context_utils_1 = __webpack_require__(2443);
const diag_1 = __webpack_require__(296);
const API_NAME = "trace";
/**
 * Singleton object which represents the entry point to the OpenTelemetry Tracing API
 */ class TraceAPI {
    /** Empty private constructor prevents end users from constructing a new instance of the API */ constructor(){
        this._proxyTracerProvider = new ProxyTracerProvider_1.ProxyTracerProvider();
        this.wrapSpanContext = spancontext_utils_1.wrapSpanContext;
        this.isSpanContextValid = spancontext_utils_1.isSpanContextValid;
        this.deleteSpan = context_utils_1.deleteSpan;
        this.getSpan = context_utils_1.getSpan;
        this.getActiveSpan = context_utils_1.getActiveSpan;
        this.getSpanContext = context_utils_1.getSpanContext;
        this.setSpan = context_utils_1.setSpan;
        this.setSpanContext = context_utils_1.setSpanContext;
    }
    /** Get the singleton instance of the Trace API */ static getInstance() {
        if (!this._instance) {
            this._instance = new TraceAPI();
        }
        return this._instance;
    }
    /**
     * Set the current global tracer.
     *
     * @returns true if the tracer provider was successfully registered, else false
     */ setGlobalTracerProvider(provider) {
        const success = (0, global_utils_1.registerGlobal)(API_NAME, this._proxyTracerProvider, diag_1.DiagAPI.instance());
        if (success) {
            this._proxyTracerProvider.setDelegate(provider);
        }
        return success;
    }
    /**
     * Returns the global tracer provider.
     */ getTracerProvider() {
        return (0, global_utils_1.getGlobal)(API_NAME) || this._proxyTracerProvider;
    }
    /**
     * Returns a tracer from the global tracer provider.
     */ getTracer(name, version) {
        return this.getTracerProvider().getTracer(name, version);
    }
    /** Remove the global tracer provider */ disable() {
        (0, global_utils_1.unregisterGlobal)(API_NAME, diag_1.DiagAPI.instance());
        this._proxyTracerProvider = new ProxyTracerProvider_1.ProxyTracerProvider();
    }
}
exports.TraceAPI = TraceAPI; //# sourceMappingURL=trace.js.map


/***/ }),

/***/ 1225:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.deleteBaggage = exports.setBaggage = exports.getActiveBaggage = exports.getBaggage = void 0;
const context_1 = __webpack_require__(6675);
const context_2 = __webpack_require__(7445);
/**
 * Baggage key
 */ const BAGGAGE_KEY = (0, context_2.createContextKey)("OpenTelemetry Baggage Key");
/**
 * Retrieve the current baggage from the given context
 *
 * @param {Context} Context that manage all context values
 * @returns {Baggage} Extracted baggage from the context
 */ function getBaggage(context) {
    return context.getValue(BAGGAGE_KEY) || undefined;
}
exports.getBaggage = getBaggage;
/**
 * Retrieve the current baggage from the active/current context
 *
 * @returns {Baggage} Extracted baggage from the context
 */ function getActiveBaggage() {
    return getBaggage(context_1.ContextAPI.getInstance().active());
}
exports.getActiveBaggage = getActiveBaggage;
/**
 * Store a baggage in the given context
 *
 * @param {Context} Context that manage all context values
 * @param {Baggage} baggage that will be set in the actual context
 */ function setBaggage(context, baggage) {
    return context.setValue(BAGGAGE_KEY, baggage);
}
exports.setBaggage = setBaggage;
/**
 * Delete the baggage stored in the given context
 *
 * @param {Context} Context that manage all context values
 */ function deleteBaggage(context) {
    return context.deleteValue(BAGGAGE_KEY);
}
exports.deleteBaggage = deleteBaggage; //# sourceMappingURL=context-helpers.js.map


/***/ }),

/***/ 5761:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.BaggageImpl = void 0;
class BaggageImpl {
    constructor(entries){
        this._entries = entries ? new Map(entries) : new Map();
    }
    getEntry(key) {
        const entry = this._entries.get(key);
        if (!entry) {
            return undefined;
        }
        return Object.assign({}, entry);
    }
    getAllEntries() {
        return Array.from(this._entries.entries()).map(([k, v])=>[
                k,
                v
            ]);
    }
    setEntry(key, entry) {
        const newBaggage = new BaggageImpl(this._entries);
        newBaggage._entries.set(key, entry);
        return newBaggage;
    }
    removeEntry(key) {
        const newBaggage = new BaggageImpl(this._entries);
        newBaggage._entries.delete(key);
        return newBaggage;
    }
    removeEntries(...keys) {
        const newBaggage = new BaggageImpl(this._entries);
        for (const key of keys){
            newBaggage._entries.delete(key);
        }
        return newBaggage;
    }
    clear() {
        return new BaggageImpl();
    }
}
exports.BaggageImpl = BaggageImpl; //# sourceMappingURL=baggage-impl.js.map


/***/ }),

/***/ 6799:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.baggageEntryMetadataSymbol = void 0;
/**
 * Symbol used to make BaggageEntryMetadata an opaque type
 */ exports.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata"); //# sourceMappingURL=symbol.js.map


/***/ }),

/***/ 8467:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.baggageEntryMetadataFromString = exports.createBaggage = void 0;
const diag_1 = __webpack_require__(296);
const baggage_impl_1 = __webpack_require__(5761);
const symbol_1 = __webpack_require__(6799);
const diag = diag_1.DiagAPI.instance();
/**
 * Create a new Baggage with optional entries
 *
 * @param entries An array of baggage entries the new baggage should contain
 */ function createBaggage(entries = {}) {
    return new baggage_impl_1.BaggageImpl(new Map(Object.entries(entries)));
}
exports.createBaggage = createBaggage;
/**
 * Create a serializable BaggageEntryMetadata object from a string.
 *
 * @param str string metadata. Format is currently not defined by the spec and has no special meaning.
 *
 */ function baggageEntryMetadataFromString(str) {
    if (typeof str !== "string") {
        diag.error(`Cannot create baggage metadata from unknown type: ${typeof str}`);
        str = "";
    }
    return {
        __TYPE__: symbol_1.baggageEntryMetadataSymbol,
        toString () {
            return str;
        }
    };
}
exports.baggageEntryMetadataFromString = baggageEntryMetadataFromString; //# sourceMappingURL=utils.js.map


/***/ }),

/***/ 7627:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.context = void 0;
// Split module-level variable definition into separate files to allow
// tree-shaking on each api instance.
const context_1 = __webpack_require__(6675);
/** Entrypoint for context API */ exports.context = context_1.ContextAPI.getInstance(); //# sourceMappingURL=context-api.js.map


/***/ }),

/***/ 4930:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.NoopContextManager = void 0;
const context_1 = __webpack_require__(7445);
class NoopContextManager {
    active() {
        return context_1.ROOT_CONTEXT;
    }
    with(_context, fn, thisArg, ...args) {
        return fn.call(thisArg, ...args);
    }
    bind(_context, target) {
        return target;
    }
    enable() {
        return this;
    }
    disable() {
        return this;
    }
}
exports.NoopContextManager = NoopContextManager; //# sourceMappingURL=NoopContextManager.js.map


/***/ }),

/***/ 7445:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.ROOT_CONTEXT = exports.createContextKey = void 0;
/** Get a key to uniquely identify a context value */ function createContextKey(description) {
    // The specification states that for the same input, multiple calls should
    // return different keys. Due to the nature of the JS dependency management
    // system, this creates problems where multiple versions of some package
    // could hold different keys for the same property.
    //
    // Therefore, we use Symbol.for which returns the same key for the same input.
    return Symbol.for(description);
}
exports.createContextKey = createContextKey;
class BaseContext {
    /**
     * Construct a new context which inherits values from an optional parent context.
     *
     * @param parentContext a context from which to inherit values
     */ constructor(parentContext){
        // for minification
        const self = this;
        self._currentContext = parentContext ? new Map(parentContext) : new Map();
        self.getValue = (key)=>self._currentContext.get(key);
        self.setValue = (key, value)=>{
            const context = new BaseContext(self._currentContext);
            context._currentContext.set(key, value);
            return context;
        };
        self.deleteValue = (key)=>{
            const context = new BaseContext(self._currentContext);
            context._currentContext.delete(key);
            return context;
        };
    }
}
/** The root context is used as the default parent context when there is no active context */ exports.ROOT_CONTEXT = new BaseContext(); //# sourceMappingURL=context.js.map


/***/ }),

/***/ 237:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.diag = void 0;
// Split module-level variable definition into separate files to allow
// tree-shaking on each api instance.
const diag_1 = __webpack_require__(296);
/**
 * Entrypoint for Diag API.
 * Defines Diagnostic handler used for internal diagnostic logging operations.
 * The default provides a Noop DiagLogger implementation which may be changed via the
 * diag.setLogger(logger: DiagLogger) function.
 */ exports.diag = diag_1.DiagAPI.instance(); //# sourceMappingURL=diag-api.js.map


/***/ }),

/***/ 8707:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.DiagComponentLogger = void 0;
const global_utils_1 = __webpack_require__(2593);
/**
 * Component Logger which is meant to be used as part of any component which
 * will add automatically additional namespace in front of the log message.
 * It will then forward all message to global diag logger
 * @example
 * const cLogger = diag.createComponentLogger({ namespace: '@opentelemetry/instrumentation-http' });
 * cLogger.debug('test');
 * // @opentelemetry/instrumentation-http test
 */ class DiagComponentLogger {
    constructor(props){
        this._namespace = props.namespace || "DiagComponentLogger";
    }
    debug(...args) {
        return logProxy("debug", this._namespace, args);
    }
    error(...args) {
        return logProxy("error", this._namespace, args);
    }
    info(...args) {
        return logProxy("info", this._namespace, args);
    }
    warn(...args) {
        return logProxy("warn", this._namespace, args);
    }
    verbose(...args) {
        return logProxy("verbose", this._namespace, args);
    }
}
exports.DiagComponentLogger = DiagComponentLogger;
function logProxy(funcName, namespace, args) {
    const logger = (0, global_utils_1.getGlobal)("diag");
    // shortcut if logger not set
    if (!logger) {
        return;
    }
    args.unshift(namespace);
    return logger[funcName](...args);
} //# sourceMappingURL=ComponentLogger.js.map


/***/ }),

/***/ 9389:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.DiagConsoleLogger = void 0;
const consoleMap = [
    {
        n: "error",
        c: "error"
    },
    {
        n: "warn",
        c: "warn"
    },
    {
        n: "info",
        c: "info"
    },
    {
        n: "debug",
        c: "debug"
    },
    {
        n: "verbose",
        c: "trace"
    }
];
/**
 * A simple Immutable Console based diagnostic logger which will output any messages to the Console.
 * If you want to limit the amount of logging to a specific level or lower use the
 * {@link createLogLevelDiagLogger}
 */ class DiagConsoleLogger {
    constructor(){
        function _consoleFunc(funcName) {
            return function(...args) {
                if (console) {
                    // Some environments only expose the console when the F12 developer console is open
                    // eslint-disable-next-line no-console
                    let theFunc = console[funcName];
                    if (typeof theFunc !== "function") {
                        // Not all environments support all functions
                        // eslint-disable-next-line no-console
                        theFunc = console.log;
                    }
                    // One last final check
                    if (typeof theFunc === "function") {
                        return theFunc.apply(console, args);
                    }
                }
            };
        }
        for(let i = 0; i < consoleMap.length; i++){
            this[consoleMap[i].n] = _consoleFunc(consoleMap[i].c);
        }
    }
}
exports.DiagConsoleLogger = DiagConsoleLogger; //# sourceMappingURL=consoleLogger.js.map


/***/ }),

/***/ 4429:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.createLogLevelDiagLogger = void 0;
const types_1 = __webpack_require__(9763);
function createLogLevelDiagLogger(maxLevel, logger) {
    if (maxLevel < types_1.DiagLogLevel.NONE) {
        maxLevel = types_1.DiagLogLevel.NONE;
    } else if (maxLevel > types_1.DiagLogLevel.ALL) {
        maxLevel = types_1.DiagLogLevel.ALL;
    }
    // In case the logger is null or undefined
    logger = logger || {};
    function _filterFunc(funcName, theLevel) {
        const theFunc = logger[funcName];
        if (typeof theFunc === "function" && maxLevel >= theLevel) {
            return theFunc.bind(logger);
        }
        return function() {};
    }
    return {
        error: _filterFunc("error", types_1.DiagLogLevel.ERROR),
        warn: _filterFunc("warn", types_1.DiagLogLevel.WARN),
        info: _filterFunc("info", types_1.DiagLogLevel.INFO),
        debug: _filterFunc("debug", types_1.DiagLogLevel.DEBUG),
        verbose: _filterFunc("verbose", types_1.DiagLogLevel.VERBOSE)
    };
}
exports.createLogLevelDiagLogger = createLogLevelDiagLogger; //# sourceMappingURL=logLevelLogger.js.map


/***/ }),

/***/ 9763:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.DiagLogLevel = void 0;
/**
 * Defines the available internal logging levels for the diagnostic logger, the numeric values
 * of the levels are defined to match the original values from the initial LogLevel to avoid
 * compatibility/migration issues for any implementation that assume the numeric ordering.
 */ var DiagLogLevel;
(function(DiagLogLevel) {
    /** Diagnostic Logging level setting to disable all logging (except and forced logs) */ DiagLogLevel[DiagLogLevel["NONE"] = 0] = "NONE";
    /** Identifies an error scenario */ DiagLogLevel[DiagLogLevel["ERROR"] = 30] = "ERROR";
    /** Identifies a warning scenario */ DiagLogLevel[DiagLogLevel["WARN"] = 50] = "WARN";
    /** General informational log message */ DiagLogLevel[DiagLogLevel["INFO"] = 60] = "INFO";
    /** General debug log message */ DiagLogLevel[DiagLogLevel["DEBUG"] = 70] = "DEBUG";
    /**
     * Detailed trace level logging should only be used for development, should only be set
     * in a development environment.
     */ DiagLogLevel[DiagLogLevel["VERBOSE"] = 80] = "VERBOSE";
    /** Used to set the logging level to include all logging */ DiagLogLevel[DiagLogLevel["ALL"] = 9999] = "ALL";
})(DiagLogLevel = exports.DiagLogLevel || (exports.DiagLogLevel = {})); //# sourceMappingURL=types.js.map


/***/ }),

/***/ 1790:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.trace = exports.propagation = exports.metrics = exports.diag = exports.context = exports.INVALID_SPAN_CONTEXT = exports.INVALID_TRACEID = exports.INVALID_SPANID = exports.isValidSpanId = exports.isValidTraceId = exports.isSpanContextValid = exports.createTraceState = exports.TraceFlags = exports.SpanStatusCode = exports.SpanKind = exports.SamplingDecision = exports.ProxyTracerProvider = exports.ProxyTracer = exports.defaultTextMapSetter = exports.defaultTextMapGetter = exports.ValueType = exports.createNoopMeter = exports.DiagLogLevel = exports.DiagConsoleLogger = exports.ROOT_CONTEXT = exports.createContextKey = exports.baggageEntryMetadataFromString = void 0;
var utils_1 = __webpack_require__(8467);
Object.defineProperty(exports, "baggageEntryMetadataFromString", ({
    enumerable: true,
    get: function() {
        return utils_1.baggageEntryMetadataFromString;
    }
}));
// Context APIs
var context_1 = __webpack_require__(7445);
Object.defineProperty(exports, "createContextKey", ({
    enumerable: true,
    get: function() {
        return context_1.createContextKey;
    }
}));
Object.defineProperty(exports, "ROOT_CONTEXT", ({
    enumerable: true,
    get: function() {
        return context_1.ROOT_CONTEXT;
    }
}));
// Diag APIs
var consoleLogger_1 = __webpack_require__(9389);
Object.defineProperty(exports, "DiagConsoleLogger", ({
    enumerable: true,
    get: function() {
        return consoleLogger_1.DiagConsoleLogger;
    }
}));
var types_1 = __webpack_require__(9763);
Object.defineProperty(exports, "DiagLogLevel", ({
    enumerable: true,
    get: function() {
        return types_1.DiagLogLevel;
    }
}));
// Metrics APIs
var NoopMeter_1 = __webpack_require__(6827);
Object.defineProperty(exports, "createNoopMeter", ({
    enumerable: true,
    get: function() {
        return NoopMeter_1.createNoopMeter;
    }
}));
var Metric_1 = __webpack_require__(7643);
Object.defineProperty(exports, "ValueType", ({
    enumerable: true,
    get: function() {
        return Metric_1.ValueType;
    }
}));
// Propagation APIs
var TextMapPropagator_1 = __webpack_require__(205);
Object.defineProperty(exports, "defaultTextMapGetter", ({
    enumerable: true,
    get: function() {
        return TextMapPropagator_1.defaultTextMapGetter;
    }
}));
Object.defineProperty(exports, "defaultTextMapSetter", ({
    enumerable: true,
    get: function() {
        return TextMapPropagator_1.defaultTextMapSetter;
    }
}));
var ProxyTracer_1 = __webpack_require__(8462);
Object.defineProperty(exports, "ProxyTracer", ({
    enumerable: true,
    get: function() {
        return ProxyTracer_1.ProxyTracer;
    }
}));
var ProxyTracerProvider_1 = __webpack_require__(7784);
Object.defineProperty(exports, "ProxyTracerProvider", ({
    enumerable: true,
    get: function() {
        return ProxyTracerProvider_1.ProxyTracerProvider;
    }
}));
var SamplingResult_1 = __webpack_require__(2949);
Object.defineProperty(exports, "SamplingDecision", ({
    enumerable: true,
    get: function() {
        return SamplingResult_1.SamplingDecision;
    }
}));
var span_kind_1 = __webpack_require__(2574);
Object.defineProperty(exports, "SpanKind", ({
    enumerable: true,
    get: function() {
        return span_kind_1.SpanKind;
    }
}));
var status_1 = __webpack_require__(8555);
Object.defineProperty(exports, "SpanStatusCode", ({
    enumerable: true,
    get: function() {
        return status_1.SpanStatusCode;
    }
}));
var trace_flags_1 = __webpack_require__(2225);
Object.defineProperty(exports, "TraceFlags", ({
    enumerable: true,
    get: function() {
        return trace_flags_1.TraceFlags;
    }
}));
var utils_2 = __webpack_require__(7320);
Object.defineProperty(exports, "createTraceState", ({
    enumerable: true,
    get: function() {
        return utils_2.createTraceState;
    }
}));
var spancontext_utils_1 = __webpack_require__(5826);
Object.defineProperty(exports, "isSpanContextValid", ({
    enumerable: true,
    get: function() {
        return spancontext_utils_1.isSpanContextValid;
    }
}));
Object.defineProperty(exports, "isValidTraceId", ({
    enumerable: true,
    get: function() {
        return spancontext_utils_1.isValidTraceId;
    }
}));
Object.defineProperty(exports, "isValidSpanId", ({
    enumerable: true,
    get: function() {
        return spancontext_utils_1.isValidSpanId;
    }
}));
var invalid_span_constants_1 = __webpack_require__(6629);
Object.defineProperty(exports, "INVALID_SPANID", ({
    enumerable: true,
    get: function() {
        return invalid_span_constants_1.INVALID_SPANID;
    }
}));
Object.defineProperty(exports, "INVALID_TRACEID", ({
    enumerable: true,
    get: function() {
        return invalid_span_constants_1.INVALID_TRACEID;
    }
}));
Object.defineProperty(exports, "INVALID_SPAN_CONTEXT", ({
    enumerable: true,
    get: function() {
        return invalid_span_constants_1.INVALID_SPAN_CONTEXT;
    }
}));
// Split module-level variable definition into separate files to allow
// tree-shaking on each api instance.
const context_api_1 = __webpack_require__(7627);
Object.defineProperty(exports, "context", ({
    enumerable: true,
    get: function() {
        return context_api_1.context;
    }
}));
const diag_api_1 = __webpack_require__(237);
Object.defineProperty(exports, "diag", ({
    enumerable: true,
    get: function() {
        return diag_api_1.diag;
    }
}));
const metrics_api_1 = __webpack_require__(4505);
Object.defineProperty(exports, "metrics", ({
    enumerable: true,
    get: function() {
        return metrics_api_1.metrics;
    }
}));
const propagation_api_1 = __webpack_require__(3253);
Object.defineProperty(exports, "propagation", ({
    enumerable: true,
    get: function() {
        return propagation_api_1.propagation;
    }
}));
const trace_api_1 = __webpack_require__(8628);
Object.defineProperty(exports, "trace", ({
    enumerable: true,
    get: function() {
        return trace_api_1.trace;
    }
}));
// Default export.
exports["default"] = {
    context: context_api_1.context,
    diag: diag_api_1.diag,
    metrics: metrics_api_1.metrics,
    propagation: propagation_api_1.propagation,
    trace: trace_api_1.trace
}; //# sourceMappingURL=index.js.map


/***/ }),

/***/ 2593:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.unregisterGlobal = exports.getGlobal = exports.registerGlobal = void 0;
const platform_1 = __webpack_require__(5107);
const version_1 = __webpack_require__(6011);
const semver_1 = __webpack_require__(868);
const major = version_1.VERSION.split(".")[0];
const GLOBAL_OPENTELEMETRY_API_KEY = Symbol.for(`opentelemetry.js.api.${major}`);
const _global = platform_1._globalThis;
function registerGlobal(type, instance, diag, allowOverride = false) {
    var _a;
    const api = _global[GLOBAL_OPENTELEMETRY_API_KEY] = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) !== null && _a !== void 0 ? _a : {
        version: version_1.VERSION
    };
    if (!allowOverride && api[type]) {
        // already registered an API of this type
        const err = new Error(`@opentelemetry/api: Attempted duplicate registration of API: ${type}`);
        diag.error(err.stack || err.message);
        return false;
    }
    if (api.version !== version_1.VERSION) {
        // All registered APIs must be of the same version exactly
        const err = new Error(`@opentelemetry/api: Registration of version v${api.version} for ${type} does not match previously registered API v${version_1.VERSION}`);
        diag.error(err.stack || err.message);
        return false;
    }
    api[type] = instance;
    diag.debug(`@opentelemetry/api: Registered a global for ${type} v${version_1.VERSION}.`);
    return true;
}
exports.registerGlobal = registerGlobal;
function getGlobal(type) {
    var _a, _b;
    const globalVersion = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _a === void 0 ? void 0 : _a.version;
    if (!globalVersion || !(0, semver_1.isCompatible)(globalVersion)) {
        return;
    }
    return (_b = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _b === void 0 ? void 0 : _b[type];
}
exports.getGlobal = getGlobal;
function unregisterGlobal(type, diag) {
    diag.debug(`@opentelemetry/api: Unregistering a global for ${type} v${version_1.VERSION}.`);
    const api = _global[GLOBAL_OPENTELEMETRY_API_KEY];
    if (api) {
        delete api[type];
    }
}
exports.unregisterGlobal = unregisterGlobal; //# sourceMappingURL=global-utils.js.map


/***/ }),

/***/ 868:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.isCompatible = exports._makeCompatibilityCheck = void 0;
const version_1 = __webpack_require__(6011);
const re = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
/**
 * Create a function to test an API version to see if it is compatible with the provided ownVersion.
 *
 * The returned function has the following semantics:
 * - Exact match is always compatible
 * - Major versions must match exactly
 *    - 1.x package cannot use global 2.x package
 *    - 2.x package cannot use global 1.x package
 * - The minor version of the API module requesting access to the global API must be less than or equal to the minor version of this API
 *    - 1.3 package may use 1.4 global because the later global contains all functions 1.3 expects
 *    - 1.4 package may NOT use 1.3 global because it may try to call functions which don't exist on 1.3
 * - If the major version is 0, the minor version is treated as the major and the patch is treated as the minor
 * - Patch and build tag differences are not considered at this time
 *
 * @param ownVersion version which should be checked against
 */ function _makeCompatibilityCheck(ownVersion) {
    const acceptedVersions = new Set([
        ownVersion
    ]);
    const rejectedVersions = new Set();
    const myVersionMatch = ownVersion.match(re);
    if (!myVersionMatch) {
        // we cannot guarantee compatibility so we always return noop
        return ()=>false;
    }
    const ownVersionParsed = {
        major: +myVersionMatch[1],
        minor: +myVersionMatch[2],
        patch: +myVersionMatch[3],
        prerelease: myVersionMatch[4]
    };
    // if ownVersion has a prerelease tag, versions must match exactly
    if (ownVersionParsed.prerelease != null) {
        return function isExactmatch(globalVersion) {
            return globalVersion === ownVersion;
        };
    }
    function _reject(v) {
        rejectedVersions.add(v);
        return false;
    }
    function _accept(v) {
        acceptedVersions.add(v);
        return true;
    }
    return function isCompatible(globalVersion) {
        if (acceptedVersions.has(globalVersion)) {
            return true;
        }
        if (rejectedVersions.has(globalVersion)) {
            return false;
        }
        const globalVersionMatch = globalVersion.match(re);
        if (!globalVersionMatch) {
            // cannot parse other version
            // we cannot guarantee compatibility so we always noop
            return _reject(globalVersion);
        }
        const globalVersionParsed = {
            major: +globalVersionMatch[1],
            minor: +globalVersionMatch[2],
            patch: +globalVersionMatch[3],
            prerelease: globalVersionMatch[4]
        };
        // if globalVersion has a prerelease tag, versions must match exactly
        if (globalVersionParsed.prerelease != null) {
            return _reject(globalVersion);
        }
        // major versions must match
        if (ownVersionParsed.major !== globalVersionParsed.major) {
            return _reject(globalVersion);
        }
        if (ownVersionParsed.major === 0) {
            if (ownVersionParsed.minor === globalVersionParsed.minor && ownVersionParsed.patch <= globalVersionParsed.patch) {
                return _accept(globalVersion);
            }
            return _reject(globalVersion);
        }
        if (ownVersionParsed.minor <= globalVersionParsed.minor) {
            return _accept(globalVersion);
        }
        return _reject(globalVersion);
    };
}
exports._makeCompatibilityCheck = _makeCompatibilityCheck;
/**
 * Test an API version to see if it is compatible with this API.
 *
 * - Exact match is always compatible
 * - Major versions must match exactly
 *    - 1.x package cannot use global 2.x package
 *    - 2.x package cannot use global 1.x package
 * - The minor version of the API module requesting access to the global API must be less than or equal to the minor version of this API
 *    - 1.3 package may use 1.4 global because the later global contains all functions 1.3 expects
 *    - 1.4 package may NOT use 1.3 global because it may try to call functions which don't exist on 1.3
 * - If the major version is 0, the minor version is treated as the major and the patch is treated as the minor
 * - Patch and build tag differences are not considered at this time
 *
 * @param version version of the API requesting an instance of the global API
 */ exports.isCompatible = _makeCompatibilityCheck(version_1.VERSION); //# sourceMappingURL=semver.js.map


/***/ }),

/***/ 4505:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.metrics = void 0;
// Split module-level variable definition into separate files to allow
// tree-shaking on each api instance.
const metrics_1 = __webpack_require__(1718);
/** Entrypoint for metrics API */ exports.metrics = metrics_1.MetricsAPI.getInstance(); //# sourceMappingURL=metrics-api.js.map


/***/ }),

/***/ 7643:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.ValueType = void 0;
/** The Type of value. It describes how the data is reported. */ var ValueType;
(function(ValueType) {
    ValueType[ValueType["INT"] = 0] = "INT";
    ValueType[ValueType["DOUBLE"] = 1] = "DOUBLE";
})(ValueType = exports.ValueType || (exports.ValueType = {})); //# sourceMappingURL=Metric.js.map


/***/ }),

/***/ 6827:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.createNoopMeter = exports.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = exports.NOOP_OBSERVABLE_GAUGE_METRIC = exports.NOOP_OBSERVABLE_COUNTER_METRIC = exports.NOOP_UP_DOWN_COUNTER_METRIC = exports.NOOP_HISTOGRAM_METRIC = exports.NOOP_COUNTER_METRIC = exports.NOOP_METER = exports.NoopObservableUpDownCounterMetric = exports.NoopObservableGaugeMetric = exports.NoopObservableCounterMetric = exports.NoopObservableMetric = exports.NoopHistogramMetric = exports.NoopUpDownCounterMetric = exports.NoopCounterMetric = exports.NoopMetric = exports.NoopMeter = void 0;
/**
 * NoopMeter is a noop implementation of the {@link Meter} interface. It reuses
 * constant NoopMetrics for all of its methods.
 */ class NoopMeter {
    constructor(){}
    /**
     * @see {@link Meter.createHistogram}
     */ createHistogram(_name, _options) {
        return exports.NOOP_HISTOGRAM_METRIC;
    }
    /**
     * @see {@link Meter.createCounter}
     */ createCounter(_name, _options) {
        return exports.NOOP_COUNTER_METRIC;
    }
    /**
     * @see {@link Meter.createUpDownCounter}
     */ createUpDownCounter(_name, _options) {
        return exports.NOOP_UP_DOWN_COUNTER_METRIC;
    }
    /**
     * @see {@link Meter.createObservableGauge}
     */ createObservableGauge(_name, _options) {
        return exports.NOOP_OBSERVABLE_GAUGE_METRIC;
    }
    /**
     * @see {@link Meter.createObservableCounter}
     */ createObservableCounter(_name, _options) {
        return exports.NOOP_OBSERVABLE_COUNTER_METRIC;
    }
    /**
     * @see {@link Meter.createObservableUpDownCounter}
     */ createObservableUpDownCounter(_name, _options) {
        return exports.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
    }
    /**
     * @see {@link Meter.addBatchObservableCallback}
     */ addBatchObservableCallback(_callback, _observables) {}
    /**
     * @see {@link Meter.removeBatchObservableCallback}
     */ removeBatchObservableCallback(_callback) {}
}
exports.NoopMeter = NoopMeter;
class NoopMetric {
}
exports.NoopMetric = NoopMetric;
class NoopCounterMetric extends NoopMetric {
    add(_value, _attributes) {}
}
exports.NoopCounterMetric = NoopCounterMetric;
class NoopUpDownCounterMetric extends NoopMetric {
    add(_value, _attributes) {}
}
exports.NoopUpDownCounterMetric = NoopUpDownCounterMetric;
class NoopHistogramMetric extends NoopMetric {
    record(_value, _attributes) {}
}
exports.NoopHistogramMetric = NoopHistogramMetric;
class NoopObservableMetric {
    addCallback(_callback) {}
    removeCallback(_callback) {}
}
exports.NoopObservableMetric = NoopObservableMetric;
class NoopObservableCounterMetric extends NoopObservableMetric {
}
exports.NoopObservableCounterMetric = NoopObservableCounterMetric;
class NoopObservableGaugeMetric extends NoopObservableMetric {
}
exports.NoopObservableGaugeMetric = NoopObservableGaugeMetric;
class NoopObservableUpDownCounterMetric extends NoopObservableMetric {
}
exports.NoopObservableUpDownCounterMetric = NoopObservableUpDownCounterMetric;
exports.NOOP_METER = new NoopMeter();
// Synchronous instruments
exports.NOOP_COUNTER_METRIC = new NoopCounterMetric();
exports.NOOP_HISTOGRAM_METRIC = new NoopHistogramMetric();
exports.NOOP_UP_DOWN_COUNTER_METRIC = new NoopUpDownCounterMetric();
// Asynchronous instruments
exports.NOOP_OBSERVABLE_COUNTER_METRIC = new NoopObservableCounterMetric();
exports.NOOP_OBSERVABLE_GAUGE_METRIC = new NoopObservableGaugeMetric();
exports.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new NoopObservableUpDownCounterMetric();
/**
 * Create a no-op Meter
 */ function createNoopMeter() {
    return exports.NOOP_METER;
}
exports.createNoopMeter = createNoopMeter; //# sourceMappingURL=NoopMeter.js.map


/***/ }),

/***/ 8978:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.NOOP_METER_PROVIDER = exports.NoopMeterProvider = void 0;
const NoopMeter_1 = __webpack_require__(6827);
/**
 * An implementation of the {@link MeterProvider} which returns an impotent Meter
 * for all calls to `getMeter`
 */ class NoopMeterProvider {
    getMeter(_name, _version, _options) {
        return NoopMeter_1.NOOP_METER;
    }
}
exports.NoopMeterProvider = NoopMeterProvider;
exports.NOOP_METER_PROVIDER = new NoopMeterProvider(); //# sourceMappingURL=NoopMeterProvider.js.map


/***/ }),

/***/ 5107:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __createBinding = (void 0) && (void 0).__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = (void 0) && (void 0).__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
__exportStar(__webpack_require__(1152), exports); //# sourceMappingURL=index.js.map


/***/ }),

/***/ 4989:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports._globalThis = void 0;
/** only globals that common to node and browsers are allowed */ // eslint-disable-next-line node/no-unsupported-features/es-builtins
exports._globalThis = typeof globalThis === "object" ? globalThis : global; //# sourceMappingURL=globalThis.js.map


/***/ }),

/***/ 1152:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __createBinding = (void 0) && (void 0).__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = (void 0) && (void 0).__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
__exportStar(__webpack_require__(4989), exports); //# sourceMappingURL=index.js.map


/***/ }),

/***/ 3253:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.propagation = void 0;
// Split module-level variable definition into separate files to allow
// tree-shaking on each api instance.
const propagation_1 = __webpack_require__(9276);
/** Entrypoint for propagation API */ exports.propagation = propagation_1.PropagationAPI.getInstance(); //# sourceMappingURL=propagation-api.js.map


/***/ }),

/***/ 4226:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.NoopTextMapPropagator = void 0;
/**
 * No-op implementations of {@link TextMapPropagator}.
 */ class NoopTextMapPropagator {
    /** Noop inject function does nothing */ inject(_context, _carrier) {}
    /** Noop extract function does nothing and returns the input context */ extract(context, _carrier) {
        return context;
    }
    fields() {
        return [];
    }
}
exports.NoopTextMapPropagator = NoopTextMapPropagator; //# sourceMappingURL=NoopTextMapPropagator.js.map


/***/ }),

/***/ 205:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.defaultTextMapSetter = exports.defaultTextMapGetter = void 0;
exports.defaultTextMapGetter = {
    get (carrier, key) {
        if (carrier == null) {
            return undefined;
        }
        return carrier[key];
    },
    keys (carrier) {
        if (carrier == null) {
            return [];
        }
        return Object.keys(carrier);
    }
};
exports.defaultTextMapSetter = {
    set (carrier, key, value) {
        if (carrier == null) {
            return;
        }
        carrier[key] = value;
    }
}; //# sourceMappingURL=TextMapPropagator.js.map


/***/ }),

/***/ 8628:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.trace = void 0;
// Split module-level variable definition into separate files to allow
// tree-shaking on each api instance.
const trace_1 = __webpack_require__(9067);
/** Entrypoint for trace API */ exports.trace = trace_1.TraceAPI.getInstance(); //# sourceMappingURL=trace-api.js.map


/***/ }),

/***/ 1328:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.NonRecordingSpan = void 0;
const invalid_span_constants_1 = __webpack_require__(6629);
/**
 * The NonRecordingSpan is the default {@link Span} that is used when no Span
 * implementation is available. All operations are no-op including context
 * propagation.
 */ class NonRecordingSpan {
    constructor(_spanContext = invalid_span_constants_1.INVALID_SPAN_CONTEXT){
        this._spanContext = _spanContext;
    }
    // Returns a SpanContext.
    spanContext() {
        return this._spanContext;
    }
    // By default does nothing
    setAttribute(_key, _value) {
        return this;
    }
    // By default does nothing
    setAttributes(_attributes) {
        return this;
    }
    // By default does nothing
    addEvent(_name, _attributes) {
        return this;
    }
    // By default does nothing
    setStatus(_status) {
        return this;
    }
    // By default does nothing
    updateName(_name) {
        return this;
    }
    // By default does nothing
    end(_endTime) {}
    // isRecording always returns false for NonRecordingSpan.
    isRecording() {
        return false;
    }
    // By default does nothing
    recordException(_exception, _time) {}
}
exports.NonRecordingSpan = NonRecordingSpan; //# sourceMappingURL=NonRecordingSpan.js.map


/***/ }),

/***/ 6873:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.NoopTracer = void 0;
const context_1 = __webpack_require__(6675);
const context_utils_1 = __webpack_require__(2443);
const NonRecordingSpan_1 = __webpack_require__(1328);
const spancontext_utils_1 = __webpack_require__(5826);
const contextApi = context_1.ContextAPI.getInstance();
/**
 * No-op implementations of {@link Tracer}.
 */ class NoopTracer {
    // startSpan starts a noop span.
    startSpan(name, options, context = contextApi.active()) {
        const root = Boolean(options === null || options === void 0 ? void 0 : options.root);
        if (root) {
            return new NonRecordingSpan_1.NonRecordingSpan();
        }
        const parentFromContext = context && (0, context_utils_1.getSpanContext)(context);
        if (isSpanContext(parentFromContext) && (0, spancontext_utils_1.isSpanContextValid)(parentFromContext)) {
            return new NonRecordingSpan_1.NonRecordingSpan(parentFromContext);
        } else {
            return new NonRecordingSpan_1.NonRecordingSpan();
        }
    }
    startActiveSpan(name, arg2, arg3, arg4) {
        let opts;
        let ctx;
        let fn;
        if (arguments.length < 2) {
            return;
        } else if (arguments.length === 2) {
            fn = arg2;
        } else if (arguments.length === 3) {
            opts = arg2;
            fn = arg3;
        } else {
            opts = arg2;
            ctx = arg3;
            fn = arg4;
        }
        const parentContext = ctx !== null && ctx !== void 0 ? ctx : contextApi.active();
        const span = this.startSpan(name, opts, parentContext);
        const contextWithSpanSet = (0, context_utils_1.setSpan)(parentContext, span);
        return contextApi.with(contextWithSpanSet, fn, undefined, span);
    }
}
exports.NoopTracer = NoopTracer;
function isSpanContext(spanContext) {
    return typeof spanContext === "object" && typeof spanContext["spanId"] === "string" && typeof spanContext["traceId"] === "string" && typeof spanContext["traceFlags"] === "number";
} //# sourceMappingURL=NoopTracer.js.map


/***/ }),

/***/ 3669:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.NoopTracerProvider = void 0;
const NoopTracer_1 = __webpack_require__(6873);
/**
 * An implementation of the {@link TracerProvider} which returns an impotent
 * Tracer for all calls to `getTracer`.
 *
 * All operations are no-op.
 */ class NoopTracerProvider {
    getTracer(_name, _version, _options) {
        return new NoopTracer_1.NoopTracer();
    }
}
exports.NoopTracerProvider = NoopTracerProvider; //# sourceMappingURL=NoopTracerProvider.js.map


/***/ }),

/***/ 8462:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.ProxyTracer = void 0;
const NoopTracer_1 = __webpack_require__(6873);
const NOOP_TRACER = new NoopTracer_1.NoopTracer();
/**
 * Proxy tracer provided by the proxy tracer provider
 */ class ProxyTracer {
    constructor(_provider, name, version, options){
        this._provider = _provider;
        this.name = name;
        this.version = version;
        this.options = options;
    }
    startSpan(name, options, context) {
        return this._getTracer().startSpan(name, options, context);
    }
    startActiveSpan(_name, _options, _context, _fn) {
        const tracer = this._getTracer();
        return Reflect.apply(tracer.startActiveSpan, tracer, arguments);
    }
    /**
     * Try to get a tracer from the proxy tracer provider.
     * If the proxy tracer provider has no delegate, return a noop tracer.
     */ _getTracer() {
        if (this._delegate) {
            return this._delegate;
        }
        const tracer = this._provider.getDelegateTracer(this.name, this.version, this.options);
        if (!tracer) {
            return NOOP_TRACER;
        }
        this._delegate = tracer;
        return this._delegate;
    }
}
exports.ProxyTracer = ProxyTracer; //# sourceMappingURL=ProxyTracer.js.map


/***/ }),

/***/ 7784:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.ProxyTracerProvider = void 0;
const ProxyTracer_1 = __webpack_require__(8462);
const NoopTracerProvider_1 = __webpack_require__(3669);
const NOOP_TRACER_PROVIDER = new NoopTracerProvider_1.NoopTracerProvider();
/**
 * Tracer provider which provides {@link ProxyTracer}s.
 *
 * Before a delegate is set, tracers provided are NoOp.
 *   When a delegate is set, traces are provided from the delegate.
 *   When a delegate is set after tracers have already been provided,
 *   all tracers already provided will use the provided delegate implementation.
 */ class ProxyTracerProvider {
    /**
     * Get a {@link ProxyTracer}
     */ getTracer(name, version, options) {
        var _a;
        return (_a = this.getDelegateTracer(name, version, options)) !== null && _a !== void 0 ? _a : new ProxyTracer_1.ProxyTracer(this, name, version, options);
    }
    getDelegate() {
        var _a;
        return (_a = this._delegate) !== null && _a !== void 0 ? _a : NOOP_TRACER_PROVIDER;
    }
    /**
     * Set the delegate tracer provider
     */ setDelegate(delegate) {
        this._delegate = delegate;
    }
    getDelegateTracer(name, version, options) {
        var _a;
        return (_a = this._delegate) === null || _a === void 0 ? void 0 : _a.getTracer(name, version, options);
    }
}
exports.ProxyTracerProvider = ProxyTracerProvider; //# sourceMappingURL=ProxyTracerProvider.js.map


/***/ }),

/***/ 2949:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.SamplingDecision = void 0;
/**
 * @deprecated use the one declared in @opentelemetry/sdk-trace-base instead.
 * A sampling decision that determines how a {@link Span} will be recorded
 * and collected.
 */ var SamplingDecision;
(function(SamplingDecision) {
    /**
     * `Span.isRecording() === false`, span will not be recorded and all events
     * and attributes will be dropped.
     */ SamplingDecision[SamplingDecision["NOT_RECORD"] = 0] = "NOT_RECORD";
    /**
     * `Span.isRecording() === true`, but `Sampled` flag in {@link TraceFlags}
     * MUST NOT be set.
     */ SamplingDecision[SamplingDecision["RECORD"] = 1] = "RECORD";
    /**
     * `Span.isRecording() === true` AND `Sampled` flag in {@link TraceFlags}
     * MUST be set.
     */ SamplingDecision[SamplingDecision["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
})(SamplingDecision = exports.SamplingDecision || (exports.SamplingDecision = {})); //# sourceMappingURL=SamplingResult.js.map


/***/ }),

/***/ 2443:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getSpanContext = exports.setSpanContext = exports.deleteSpan = exports.setSpan = exports.getActiveSpan = exports.getSpan = void 0;
const context_1 = __webpack_require__(7445);
const NonRecordingSpan_1 = __webpack_require__(1328);
const context_2 = __webpack_require__(6675);
/**
 * span key
 */ const SPAN_KEY = (0, context_1.createContextKey)("OpenTelemetry Context Key SPAN");
/**
 * Return the span if one exists
 *
 * @param context context to get span from
 */ function getSpan(context) {
    return context.getValue(SPAN_KEY) || undefined;
}
exports.getSpan = getSpan;
/**
 * Gets the span from the current context, if one exists.
 */ function getActiveSpan() {
    return getSpan(context_2.ContextAPI.getInstance().active());
}
exports.getActiveSpan = getActiveSpan;
/**
 * Set the span on a context
 *
 * @param context context to use as parent
 * @param span span to set active
 */ function setSpan(context, span) {
    return context.setValue(SPAN_KEY, span);
}
exports.setSpan = setSpan;
/**
 * Remove current span stored in the context
 *
 * @param context context to delete span from
 */ function deleteSpan(context) {
    return context.deleteValue(SPAN_KEY);
}
exports.deleteSpan = deleteSpan;
/**
 * Wrap span context in a NoopSpan and set as span in a new
 * context
 *
 * @param context context to set active span on
 * @param spanContext span context to be wrapped
 */ function setSpanContext(context, spanContext) {
    return setSpan(context, new NonRecordingSpan_1.NonRecordingSpan(spanContext));
}
exports.setSpanContext = setSpanContext;
/**
 * Get the span context of the span if it exists.
 *
 * @param context context to get values from
 */ function getSpanContext(context) {
    var _a;
    return (_a = getSpan(context)) === null || _a === void 0 ? void 0 : _a.spanContext();
}
exports.getSpanContext = getSpanContext; //# sourceMappingURL=context-utils.js.map


/***/ }),

/***/ 1529:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.TraceStateImpl = void 0;
const tracestate_validators_1 = __webpack_require__(758);
const MAX_TRACE_STATE_ITEMS = 32;
const MAX_TRACE_STATE_LEN = 512;
const LIST_MEMBERS_SEPARATOR = ",";
const LIST_MEMBER_KEY_VALUE_SPLITTER = "=";
/**
 * TraceState must be a class and not a simple object type because of the spec
 * requirement (https://www.w3.org/TR/trace-context/#tracestate-field).
 *
 * Here is the list of allowed mutations:
 * - New key-value pair should be added into the beginning of the list
 * - The value of any key can be updated. Modified keys MUST be moved to the
 * beginning of the list.
 */ class TraceStateImpl {
    constructor(rawTraceState){
        this._internalState = new Map();
        if (rawTraceState) this._parse(rawTraceState);
    }
    set(key, value) {
        // TODO: Benchmark the different approaches(map vs list) and
        // use the faster one.
        const traceState = this._clone();
        if (traceState._internalState.has(key)) {
            traceState._internalState.delete(key);
        }
        traceState._internalState.set(key, value);
        return traceState;
    }
    unset(key) {
        const traceState = this._clone();
        traceState._internalState.delete(key);
        return traceState;
    }
    get(key) {
        return this._internalState.get(key);
    }
    serialize() {
        return this._keys().reduce((agg, key)=>{
            agg.push(key + LIST_MEMBER_KEY_VALUE_SPLITTER + this.get(key));
            return agg;
        }, []).join(LIST_MEMBERS_SEPARATOR);
    }
    _parse(rawTraceState) {
        if (rawTraceState.length > MAX_TRACE_STATE_LEN) return;
        this._internalState = rawTraceState.split(LIST_MEMBERS_SEPARATOR).reverse() // Store in reverse so new keys (.set(...)) will be placed at the beginning
        .reduce((agg, part)=>{
            const listMember = part.trim(); // Optional Whitespace (OWS) handling
            const i = listMember.indexOf(LIST_MEMBER_KEY_VALUE_SPLITTER);
            if (i !== -1) {
                const key = listMember.slice(0, i);
                const value = listMember.slice(i + 1, part.length);
                if ((0, tracestate_validators_1.validateKey)(key) && (0, tracestate_validators_1.validateValue)(value)) {
                    agg.set(key, value);
                } else {
                // TODO: Consider to add warning log
                }
            }
            return agg;
        }, new Map());
        // Because of the reverse() requirement, trunc must be done after map is created
        if (this._internalState.size > MAX_TRACE_STATE_ITEMS) {
            this._internalState = new Map(Array.from(this._internalState.entries()).reverse() // Use reverse same as original tracestate parse chain
            .slice(0, MAX_TRACE_STATE_ITEMS));
        }
    }
    _keys() {
        return Array.from(this._internalState.keys()).reverse();
    }
    _clone() {
        const traceState = new TraceStateImpl();
        traceState._internalState = new Map(this._internalState);
        return traceState;
    }
}
exports.TraceStateImpl = TraceStateImpl; //# sourceMappingURL=tracestate-impl.js.map


/***/ }),

/***/ 758:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.validateValue = exports.validateKey = void 0;
const VALID_KEY_CHAR_RANGE = "[_0-9a-z-*/]";
const VALID_KEY = `[a-z]${VALID_KEY_CHAR_RANGE}{0,255}`;
const VALID_VENDOR_KEY = `[a-z0-9]${VALID_KEY_CHAR_RANGE}{0,240}@[a-z]${VALID_KEY_CHAR_RANGE}{0,13}`;
const VALID_KEY_REGEX = new RegExp(`^(?:${VALID_KEY}|${VALID_VENDOR_KEY})$`);
const VALID_VALUE_BASE_REGEX = /^[ -~]{0,255}[!-~]$/;
const INVALID_VALUE_COMMA_EQUAL_REGEX = /,|=/;
/**
 * Key is opaque string up to 256 characters printable. It MUST begin with a
 * lowercase letter, and can only contain lowercase letters a-z, digits 0-9,
 * underscores _, dashes -, asterisks *, and forward slashes /.
 * For multi-tenant vendor scenarios, an at sign (@) can be used to prefix the
 * vendor name. Vendors SHOULD set the tenant ID at the beginning of the key.
 * see https://www.w3.org/TR/trace-context/#key
 */ function validateKey(key) {
    return VALID_KEY_REGEX.test(key);
}
exports.validateKey = validateKey;
/**
 * Value is opaque string up to 256 characters printable ASCII RFC0020
 * characters (i.e., the range 0x20 to 0x7E) except comma , and =.
 */ function validateValue(value) {
    return VALID_VALUE_BASE_REGEX.test(value) && !INVALID_VALUE_COMMA_EQUAL_REGEX.test(value);
}
exports.validateValue = validateValue; //# sourceMappingURL=tracestate-validators.js.map


/***/ }),

/***/ 7320:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.createTraceState = void 0;
const tracestate_impl_1 = __webpack_require__(1529);
function createTraceState(rawTraceState) {
    return new tracestate_impl_1.TraceStateImpl(rawTraceState);
}
exports.createTraceState = createTraceState; //# sourceMappingURL=utils.js.map


/***/ }),

/***/ 6629:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.INVALID_SPAN_CONTEXT = exports.INVALID_TRACEID = exports.INVALID_SPANID = void 0;
const trace_flags_1 = __webpack_require__(2225);
exports.INVALID_SPANID = "0000000000000000";
exports.INVALID_TRACEID = "00000000000000000000000000000000";
exports.INVALID_SPAN_CONTEXT = {
    traceId: exports.INVALID_TRACEID,
    spanId: exports.INVALID_SPANID,
    traceFlags: trace_flags_1.TraceFlags.NONE
}; //# sourceMappingURL=invalid-span-constants.js.map


/***/ }),

/***/ 2574:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.SpanKind = void 0;
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var SpanKind;
(function(SpanKind) {
    /** Default value. Indicates that the span is used internally. */ SpanKind[SpanKind["INTERNAL"] = 0] = "INTERNAL";
    /**
     * Indicates that the span covers server-side handling of an RPC or other
     * remote request.
     */ SpanKind[SpanKind["SERVER"] = 1] = "SERVER";
    /**
     * Indicates that the span covers the client-side wrapper around an RPC or
     * other remote request.
     */ SpanKind[SpanKind["CLIENT"] = 2] = "CLIENT";
    /**
     * Indicates that the span describes producer sending a message to a
     * broker. Unlike client and server, there is no direct critical path latency
     * relationship between producer and consumer spans.
     */ SpanKind[SpanKind["PRODUCER"] = 3] = "PRODUCER";
    /**
     * Indicates that the span describes consumer receiving a message from a
     * broker. Unlike client and server, there is no direct critical path latency
     * relationship between producer and consumer spans.
     */ SpanKind[SpanKind["CONSUMER"] = 4] = "CONSUMER";
})(SpanKind = exports.SpanKind || (exports.SpanKind = {})); //# sourceMappingURL=span_kind.js.map


/***/ }),

/***/ 5826:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.wrapSpanContext = exports.isSpanContextValid = exports.isValidSpanId = exports.isValidTraceId = void 0;
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const invalid_span_constants_1 = __webpack_require__(6629);
const NonRecordingSpan_1 = __webpack_require__(1328);
const VALID_TRACEID_REGEX = /^([0-9a-f]{32})$/i;
const VALID_SPANID_REGEX = /^[0-9a-f]{16}$/i;
function isValidTraceId(traceId) {
    return VALID_TRACEID_REGEX.test(traceId) && traceId !== invalid_span_constants_1.INVALID_TRACEID;
}
exports.isValidTraceId = isValidTraceId;
function isValidSpanId(spanId) {
    return VALID_SPANID_REGEX.test(spanId) && spanId !== invalid_span_constants_1.INVALID_SPANID;
}
exports.isValidSpanId = isValidSpanId;
/**
 * Returns true if this {@link SpanContext} is valid.
 * @return true if this {@link SpanContext} is valid.
 */ function isSpanContextValid(spanContext) {
    return isValidTraceId(spanContext.traceId) && isValidSpanId(spanContext.spanId);
}
exports.isSpanContextValid = isSpanContextValid;
/**
 * Wrap the given {@link SpanContext} in a new non-recording {@link Span}
 *
 * @param spanContext span context to be wrapped
 * @returns a new non-recording {@link Span} with the provided context
 */ function wrapSpanContext(spanContext) {
    return new NonRecordingSpan_1.NonRecordingSpan(spanContext);
}
exports.wrapSpanContext = wrapSpanContext; //# sourceMappingURL=spancontext-utils.js.map


/***/ }),

/***/ 8555:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.SpanStatusCode = void 0;
/**
 * An enumeration of status codes.
 */ var SpanStatusCode;
(function(SpanStatusCode) {
    /**
     * The default status.
     */ SpanStatusCode[SpanStatusCode["UNSET"] = 0] = "UNSET";
    /**
     * The operation has been validated by an Application developer or
     * Operator to have completed successfully.
     */ SpanStatusCode[SpanStatusCode["OK"] = 1] = "OK";
    /**
     * The operation contains an error.
     */ SpanStatusCode[SpanStatusCode["ERROR"] = 2] = "ERROR";
})(SpanStatusCode = exports.SpanStatusCode || (exports.SpanStatusCode = {})); //# sourceMappingURL=status.js.map


/***/ }),

/***/ 2225:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.TraceFlags = void 0;
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var TraceFlags;
(function(TraceFlags) {
    /** Represents no flag set. */ TraceFlags[TraceFlags["NONE"] = 0] = "NONE";
    /** Bit to represent whether trace is sampled in trace flags. */ TraceFlags[TraceFlags["SAMPLED"] = 1] = "SAMPLED";
})(TraceFlags = exports.TraceFlags || (exports.TraceFlags = {})); //# sourceMappingURL=trace_flags.js.map


/***/ }),

/***/ 6011:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.VERSION = void 0;
// this is autogenerated file, see scripts/version-update.js
exports.VERSION = "1.4.1"; //# sourceMappingURL=version.js.map


/***/ }),

/***/ 8659:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    prefixes: function() {
        return prefixes;
    },
    wait: function() {
        return wait;
    },
    error: function() {
        return error;
    },
    warn: function() {
        return warn;
    },
    ready: function() {
        return ready;
    },
    info: function() {
        return info;
    },
    event: function() {
        return event;
    },
    trace: function() {
        return trace;
    },
    warnOnce: function() {
        return warnOnce;
    }
});
const _chalk = /*#__PURE__*/ _interop_require_default(__webpack_require__(8852));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const prefixes = {
    wait: "- " + _chalk.default.cyan("wait"),
    error: "- " + _chalk.default.red("error"),
    warn: "- " + _chalk.default.yellow("warn"),
    ready: "- " + _chalk.default.green("ready"),
    info: "- " + _chalk.default.cyan("info"),
    event: "- " + _chalk.default.magenta("event"),
    trace: "- " + _chalk.default.magenta("trace")
};
function wait(...message) {
    console.log(prefixes.wait, ...message);
}
function error(...message) {
    console.error(prefixes.error, ...message);
}
function warn(...message) {
    console.warn(prefixes.warn, ...message);
}
function ready(...message) {
    console.log(prefixes.ready, ...message);
}
function info(...message) {
    console.log(prefixes.info, ...message);
}
function event(...message) {
    console.log(prefixes.event, ...message);
}
function trace(...message) {
    console.log(prefixes.trace, ...message);
}
const warnOnceMessages = new Set();
function warnOnce(...message) {
    if (!warnOnceMessages.has(message[0])) {
        warnOnceMessages.add(message.join(" "));
        warn(...message);
    }
} //# sourceMappingURL=log.js.map


/***/ }),

/***/ 8810:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "DraftMode", ({
    enumerable: true,
    get: function() {
        return DraftMode;
    }
}));
const _staticgenerationbailout = __webpack_require__(7931);
class DraftMode {
    get isEnabled() {
        return this._provider.isEnabled;
    }
    enable() {
        if ((0, _staticgenerationbailout.staticGenerationBailout)("draftMode().enable()")) {
            return;
        }
        return this._provider.enable();
    }
    disable() {
        if ((0, _staticgenerationbailout.staticGenerationBailout)("draftMode().disable()")) {
            return;
        }
        return this._provider.disable();
    }
    constructor(provider){
        this._provider = provider;
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=draft-mode.js.map


/***/ }),

/***/ 316:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    headers: function() {
        return headers;
    },
    cookies: function() {
        return cookies;
    },
    draftMode: function() {
        return draftMode;
    }
});
const _requestcookies = __webpack_require__(4277);
const _headers = __webpack_require__(2022);
const _cookies = __webpack_require__(2634);
const _requestasyncstorage = __webpack_require__(3474);
const _actionasyncstorage = __webpack_require__(7629);
const _staticgenerationbailout = __webpack_require__(7931);
const _draftmode = __webpack_require__(8810);
function headers() {
    if ((0, _staticgenerationbailout.staticGenerationBailout)("headers")) {
        return _headers.HeadersAdapter.seal(new Headers({}));
    }
    const requestStore = _requestasyncstorage.requestAsyncStorage.getStore();
    if (!requestStore) {
        throw new Error("Invariant: Method expects to have requestAsyncStorage, none available");
    }
    return requestStore.headers;
}
function cookies() {
    if ((0, _staticgenerationbailout.staticGenerationBailout)("cookies")) {
        return _requestcookies.RequestCookiesAdapter.seal(new _cookies.RequestCookies(new Headers({})));
    }
    const requestStore = _requestasyncstorage.requestAsyncStorage.getStore();
    if (!requestStore) {
        throw new Error("Invariant: Method expects to have requestAsyncStorage, none available");
    }
    const asyncActionStore = _actionasyncstorage.actionAsyncStorage.getStore();
    if (asyncActionStore && (asyncActionStore.isAction || asyncActionStore.isAppRoute)) {
        // We can't conditionally return different types here based on the context.
        // To avoid confusion, we always return the readonly type here.
        return requestStore.mutableCookies;
    }
    return requestStore.cookies;
}
function draftMode() {
    const requestStore = _requestasyncstorage.requestAsyncStorage.getStore();
    if (!requestStore) {
        throw new Error("Invariant: Method expects to have requestAsyncStorage, none available");
    }
    return new _draftmode.DraftMode(requestStore.draftMode);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=headers.js.map


/***/ }),

/***/ 1084:
/***/ ((module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    notFound: function() {
        return notFound;
    },
    isNotFoundError: function() {
        return isNotFoundError;
    }
});
const NOT_FOUND_ERROR_CODE = "NEXT_NOT_FOUND";
function notFound() {
    // eslint-disable-next-line no-throw-literal
    const error = new Error(NOT_FOUND_ERROR_CODE);
    error.digest = NOT_FOUND_ERROR_CODE;
    throw error;
}
function isNotFoundError(error) {
    return (error == null ? void 0 : error.digest) === NOT_FOUND_ERROR_CODE;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=not-found.js.map


/***/ }),

/***/ 2633:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    RedirectType: function() {
        return RedirectType;
    },
    getRedirectError: function() {
        return getRedirectError;
    },
    redirect: function() {
        return redirect;
    },
    isRedirectError: function() {
        return isRedirectError;
    },
    getURLFromRedirectError: function() {
        return getURLFromRedirectError;
    },
    getRedirectTypeFromError: function() {
        return getRedirectTypeFromError;
    }
});
const _requestasyncstorage = __webpack_require__(3474);
const REDIRECT_ERROR_CODE = "NEXT_REDIRECT";
var RedirectType;
(function(RedirectType) {
    RedirectType["push"] = "push";
    RedirectType["replace"] = "replace";
})(RedirectType || (RedirectType = {}));
function getRedirectError(url, type) {
    const error = new Error(REDIRECT_ERROR_CODE);
    error.digest = REDIRECT_ERROR_CODE + ";" + type + ";" + url;
    const requestStore = _requestasyncstorage.requestAsyncStorage.getStore();
    if (requestStore) {
        error.mutableCookies = requestStore.mutableCookies;
    }
    return error;
}
function redirect(url, type) {
    if (type === void 0) type = "replace";
    throw getRedirectError(url, type);
}
function isRedirectError(error) {
    if (typeof (error == null ? void 0 : error.digest) !== "string") return false;
    const [errorCode, type, destination] = error.digest.split(";", 3);
    return errorCode === REDIRECT_ERROR_CODE && (type === "replace" || type === "push") && typeof destination === "string";
}
function getURLFromRedirectError(error) {
    if (!isRedirectError(error)) return null;
    // Slices off the beginning of the digest that contains the code and the
    // separating ';'.
    return error.digest.split(";", 3)[2];
}
function getRedirectTypeFromError(error) {
    if (!isRedirectError(error)) {
        throw new Error("Not a redirect error");
    }
    return error.digest.split(";", 3)[1];
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect.js.map


/***/ }),

/***/ 4966:
/***/ ((module) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    RequestCookies: ()=>RequestCookies,
    ResponseCookies: ()=>ResponseCookies
});
module.exports = __toCommonJS(src_exports);
// src/serialize.ts
function serialize(c) {
    var _a;
    const attrs = [
        "path" in c && c.path && `Path=${c.path}`,
        "expires" in c && (c.expires || c.expires === 0) && `Expires=${(typeof c.expires === "number" ? new Date(c.expires) : c.expires).toUTCString()}`,
        "maxAge" in c && typeof c.maxAge === "number" && `Max-Age=${c.maxAge}`,
        "domain" in c && c.domain && `Domain=${c.domain}`,
        "secure" in c && c.secure && "Secure",
        "httpOnly" in c && c.httpOnly && "HttpOnly",
        "sameSite" in c && c.sameSite && `SameSite=${c.sameSite}`
    ].filter(Boolean);
    return `${c.name}=${encodeURIComponent((_a = c.value) != null ? _a : "")}; ${attrs.join("; ")}`;
}
function parseCookieString(cookie) {
    const map = /* @__PURE__ */ new Map();
    for (const pair of cookie.split(/; */)){
        if (!pair) continue;
        const splitAt = pair.indexOf("=");
        if (splitAt === -1) {
            map.set(pair, "true");
            continue;
        }
        const [key, value] = [
            pair.slice(0, splitAt),
            pair.slice(splitAt + 1)
        ];
        try {
            map.set(key, decodeURIComponent(value != null ? value : "true"));
        } catch  {}
    }
    return map;
}
function parseSetCookieString(setCookie) {
    if (!setCookie) {
        return void 0;
    }
    const [[name, value], ...attributes] = parseCookieString(setCookie);
    const { domain, expires, httponly, maxage, path, samesite, secure } = Object.fromEntries(attributes.map(([key, value2])=>[
            key.toLowerCase(),
            value2
        ]));
    const cookie = {
        name,
        value: decodeURIComponent(value),
        domain,
        ...expires && {
            expires: new Date(expires)
        },
        ...httponly && {
            httpOnly: true
        },
        ...typeof maxage === "string" && {
            maxAge: Number(maxage)
        },
        path,
        ...samesite && {
            sameSite: parseSameSite(samesite)
        },
        ...secure && {
            secure: true
        }
    };
    return compact(cookie);
}
function compact(t) {
    const newT = {};
    for(const key in t){
        if (t[key]) {
            newT[key] = t[key];
        }
    }
    return newT;
}
var SAME_SITE = [
    "strict",
    "lax",
    "none"
];
function parseSameSite(string) {
    string = string.toLowerCase();
    return SAME_SITE.includes(string) ? string : void 0;
}
// src/request-cookies.ts
var RequestCookies = class {
    constructor(requestHeaders){
        /** @internal */ this._parsed = /* @__PURE__ */ new Map();
        this._headers = requestHeaders;
        const header = requestHeaders.get("cookie");
        if (header) {
            const parsed = parseCookieString(header);
            for (const [name, value] of parsed){
                this._parsed.set(name, {
                    name,
                    value
                });
            }
        }
    }
    [Symbol.iterator]() {
        return this._parsed[Symbol.iterator]();
    }
    /**
   * The amount of cookies received from the client
   */ get size() {
        return this._parsed.size;
    }
    get(...args) {
        const name = typeof args[0] === "string" ? args[0] : args[0].name;
        return this._parsed.get(name);
    }
    getAll(...args) {
        var _a;
        const all = Array.from(this._parsed);
        if (!args.length) {
            return all.map(([_, value])=>value);
        }
        const name = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
        return all.filter(([n])=>n === name).map(([_, value])=>value);
    }
    has(name) {
        return this._parsed.has(name);
    }
    set(...args) {
        const [name, value] = args.length === 1 ? [
            args[0].name,
            args[0].value
        ] : args;
        const map = this._parsed;
        map.set(name, {
            name,
            value
        });
        this._headers.set("cookie", Array.from(map).map(([_, value2])=>serialize(value2)).join("; "));
        return this;
    }
    /**
   * Delete the cookies matching the passed name or names in the request.
   */ delete(names) {
        const map = this._parsed;
        const result = !Array.isArray(names) ? map.delete(names) : names.map((name)=>map.delete(name));
        this._headers.set("cookie", Array.from(map).map(([_, value])=>serialize(value)).join("; "));
        return result;
    }
    /**
   * Delete all the cookies in the cookies in the request.
   */ clear() {
        this.delete(Array.from(this._parsed.keys()));
        return this;
    }
    /**
   * Format the cookies in the request as a string for logging
   */ [Symbol.for("edge-runtime.inspect.custom")]() {
        return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
    }
    toString() {
        return [
            ...this._parsed.values()
        ].map((v)=>`${v.name}=${encodeURIComponent(v.value)}`).join("; ");
    }
};
// src/response-cookies.ts
var ResponseCookies = class {
    constructor(responseHeaders){
        /** @internal */ this._parsed = /* @__PURE__ */ new Map();
        var _a, _b, _c;
        this._headers = responseHeaders;
        const setCookie = // @ts-expect-error See https://github.com/whatwg/fetch/issues/973
        (_c = (_b = (_a = responseHeaders.getAll) == null ? void 0 : _a.call(responseHeaders, "set-cookie")) != null ? _b : responseHeaders.get("set-cookie")) != null ? _c : [];
        const cookieStrings = Array.isArray(setCookie) ? setCookie : splitCookiesString(setCookie);
        for (const cookieString of cookieStrings){
            const parsed = parseSetCookieString(cookieString);
            if (parsed) this._parsed.set(parsed.name, parsed);
        }
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-get CookieStore#get} without the Promise.
   */ get(...args) {
        const key = typeof args[0] === "string" ? args[0] : args[0].name;
        return this._parsed.get(key);
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-getAll CookieStore#getAll} without the Promise.
   */ getAll(...args) {
        var _a;
        const all = Array.from(this._parsed.values());
        if (!args.length) {
            return all;
        }
        const key = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
        return all.filter((c)=>c.name === key);
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-set CookieStore#set} without the Promise.
   */ set(...args) {
        const [name, value, cookie] = args.length === 1 ? [
            args[0].name,
            args[0].value,
            args[0]
        ] : args;
        const map = this._parsed;
        map.set(name, normalizeCookie({
            name,
            value,
            ...cookie
        }));
        replace(map, this._headers);
        return this;
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-delete CookieStore#delete} without the Promise.
   */ delete(...args) {
        const name = typeof args[0] === "string" ? args[0] : args[0].name;
        return this.set({
            name,
            value: "",
            expires: /* @__PURE__ */ new Date(0)
        });
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
    }
    toString() {
        return [
            ...this._parsed.values()
        ].map(serialize).join("; ");
    }
};
function replace(bag, headers) {
    headers.delete("set-cookie");
    for (const [, value] of bag){
        const serialized = serialize(value);
        headers.append("set-cookie", serialized);
    }
}
function normalizeCookie(cookie = {
    name: "",
    value: ""
}) {
    if (typeof cookie.expires === "number") {
        cookie.expires = new Date(cookie.expires);
    }
    if (cookie.maxAge) {
        cookie.expires = new Date(Date.now() + cookie.maxAge * 1e3);
    }
    if (cookie.path === null || cookie.path === void 0) {
        cookie.path = "/";
    }
    return cookie;
}
function splitCookiesString(cookiesString) {
    if (!cookiesString) return [];
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
    }
    while(pos < cookiesString.length){
        start = pos;
        cookiesSeparatorFound = false;
        while(skipWhitespace()){
            ch = cookiesString.charAt(pos);
            if (ch === ",") {
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while(pos < cookiesString.length && notSpecialChar()){
                    pos += 1;
                }
                if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                    cookiesSeparatorFound = true;
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                } else {
                    pos = lastComma + 1;
                }
            } else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 8015:
/***/ ((module) => {


(()=>{
    "use strict";
    var e = {
        339: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ContextAPI = void 0;
            const n = r(44);
            const a = r(38);
            const o = r(741);
            const i = "context";
            const c = new n.NoopContextManager;
            class ContextAPI {
                constructor(){}
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new ContextAPI;
                    }
                    return this._instance;
                }
                setGlobalContextManager(e) {
                    return (0, a.registerGlobal)(i, e, o.DiagAPI.instance());
                }
                active() {
                    return this._getContextManager().active();
                }
                with(e, t, r, ...n) {
                    return this._getContextManager().with(e, t, r, ...n);
                }
                bind(e, t) {
                    return this._getContextManager().bind(e, t);
                }
                _getContextManager() {
                    return (0, a.getGlobal)(i) || c;
                }
                disable() {
                    this._getContextManager().disable();
                    (0, a.unregisterGlobal)(i, o.DiagAPI.instance());
                }
            }
            t.ContextAPI = ContextAPI;
        },
        741: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagAPI = void 0;
            const n = r(144);
            const a = r(871);
            const o = r(133);
            const i = r(38);
            const c = "diag";
            class DiagAPI {
                constructor(){
                    function _logProxy(e) {
                        return function(...t) {
                            const r = (0, i.getGlobal)("diag");
                            if (!r) return;
                            return r[e](...t);
                        };
                    }
                    const e = this;
                    const setLogger = (t, r = {
                        logLevel: o.DiagLogLevel.INFO
                    })=>{
                        var n, c, s;
                        if (t === e) {
                            const t = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                            e.error((n = t.stack) !== null && n !== void 0 ? n : t.message);
                            return false;
                        }
                        if (typeof r === "number") {
                            r = {
                                logLevel: r
                            };
                        }
                        const u = (0, i.getGlobal)("diag");
                        const l = (0, a.createLogLevelDiagLogger)((c = r.logLevel) !== null && c !== void 0 ? c : o.DiagLogLevel.INFO, t);
                        if (u && !r.suppressOverrideMessage) {
                            const e = (s = (new Error).stack) !== null && s !== void 0 ? s : "<failed to generate stacktrace>";
                            u.warn(`Current logger will be overwritten from ${e}`);
                            l.warn(`Current logger will overwrite one already registered from ${e}`);
                        }
                        return (0, i.registerGlobal)("diag", l, e, true);
                    };
                    e.setLogger = setLogger;
                    e.disable = ()=>{
                        (0, i.unregisterGlobal)(c, e);
                    };
                    e.createComponentLogger = (e)=>new n.DiagComponentLogger(e);
                    e.verbose = _logProxy("verbose");
                    e.debug = _logProxy("debug");
                    e.info = _logProxy("info");
                    e.warn = _logProxy("warn");
                    e.error = _logProxy("error");
                }
                static instance() {
                    if (!this._instance) {
                        this._instance = new DiagAPI;
                    }
                    return this._instance;
                }
            }
            t.DiagAPI = DiagAPI;
        },
        128: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.MetricsAPI = void 0;
            const n = r(333);
            const a = r(38);
            const o = r(741);
            const i = "metrics";
            class MetricsAPI {
                constructor(){}
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new MetricsAPI;
                    }
                    return this._instance;
                }
                setGlobalMeterProvider(e) {
                    return (0, a.registerGlobal)(i, e, o.DiagAPI.instance());
                }
                getMeterProvider() {
                    return (0, a.getGlobal)(i) || n.NOOP_METER_PROVIDER;
                }
                getMeter(e, t, r) {
                    return this.getMeterProvider().getMeter(e, t, r);
                }
                disable() {
                    (0, a.unregisterGlobal)(i, o.DiagAPI.instance());
                }
            }
            t.MetricsAPI = MetricsAPI;
        },
        930: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.PropagationAPI = void 0;
            const n = r(38);
            const a = r(600);
            const o = r(625);
            const i = r(377);
            const c = r(701);
            const s = r(741);
            const u = "propagation";
            const l = new a.NoopTextMapPropagator;
            class PropagationAPI {
                constructor(){
                    this.createBaggage = c.createBaggage;
                    this.getBaggage = i.getBaggage;
                    this.getActiveBaggage = i.getActiveBaggage;
                    this.setBaggage = i.setBaggage;
                    this.deleteBaggage = i.deleteBaggage;
                }
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new PropagationAPI;
                    }
                    return this._instance;
                }
                setGlobalPropagator(e) {
                    return (0, n.registerGlobal)(u, e, s.DiagAPI.instance());
                }
                inject(e, t, r = o.defaultTextMapSetter) {
                    return this._getGlobalPropagator().inject(e, t, r);
                }
                extract(e, t, r = o.defaultTextMapGetter) {
                    return this._getGlobalPropagator().extract(e, t, r);
                }
                fields() {
                    return this._getGlobalPropagator().fields();
                }
                disable() {
                    (0, n.unregisterGlobal)(u, s.DiagAPI.instance());
                }
                _getGlobalPropagator() {
                    return (0, n.getGlobal)(u) || l;
                }
            }
            t.PropagationAPI = PropagationAPI;
        },
        967: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.TraceAPI = void 0;
            const n = r(38);
            const a = r(414);
            const o = r(994);
            const i = r(542);
            const c = r(741);
            const s = "trace";
            class TraceAPI {
                constructor(){
                    this._proxyTracerProvider = new a.ProxyTracerProvider;
                    this.wrapSpanContext = o.wrapSpanContext;
                    this.isSpanContextValid = o.isSpanContextValid;
                    this.deleteSpan = i.deleteSpan;
                    this.getSpan = i.getSpan;
                    this.getActiveSpan = i.getActiveSpan;
                    this.getSpanContext = i.getSpanContext;
                    this.setSpan = i.setSpan;
                    this.setSpanContext = i.setSpanContext;
                }
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new TraceAPI;
                    }
                    return this._instance;
                }
                setGlobalTracerProvider(e) {
                    const t = (0, n.registerGlobal)(s, this._proxyTracerProvider, c.DiagAPI.instance());
                    if (t) {
                        this._proxyTracerProvider.setDelegate(e);
                    }
                    return t;
                }
                getTracerProvider() {
                    return (0, n.getGlobal)(s) || this._proxyTracerProvider;
                }
                getTracer(e, t) {
                    return this.getTracerProvider().getTracer(e, t);
                }
                disable() {
                    (0, n.unregisterGlobal)(s, c.DiagAPI.instance());
                    this._proxyTracerProvider = new a.ProxyTracerProvider;
                }
            }
            t.TraceAPI = TraceAPI;
        },
        377: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.deleteBaggage = t.setBaggage = t.getActiveBaggage = t.getBaggage = void 0;
            const n = r(339);
            const a = r(421);
            const o = (0, a.createContextKey)("OpenTelemetry Baggage Key");
            function getBaggage(e) {
                return e.getValue(o) || undefined;
            }
            t.getBaggage = getBaggage;
            function getActiveBaggage() {
                return getBaggage(n.ContextAPI.getInstance().active());
            }
            t.getActiveBaggage = getActiveBaggage;
            function setBaggage(e, t) {
                return e.setValue(o, t);
            }
            t.setBaggage = setBaggage;
            function deleteBaggage(e) {
                return e.deleteValue(o);
            }
            t.deleteBaggage = deleteBaggage;
        },
        496: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.BaggageImpl = void 0;
            class BaggageImpl {
                constructor(e){
                    this._entries = e ? new Map(e) : new Map;
                }
                getEntry(e) {
                    const t = this._entries.get(e);
                    if (!t) {
                        return undefined;
                    }
                    return Object.assign({}, t);
                }
                getAllEntries() {
                    return Array.from(this._entries.entries()).map(([e, t])=>[
                            e,
                            t
                        ]);
                }
                setEntry(e, t) {
                    const r = new BaggageImpl(this._entries);
                    r._entries.set(e, t);
                    return r;
                }
                removeEntry(e) {
                    const t = new BaggageImpl(this._entries);
                    t._entries.delete(e);
                    return t;
                }
                removeEntries(...e) {
                    const t = new BaggageImpl(this._entries);
                    for (const r of e){
                        t._entries.delete(r);
                    }
                    return t;
                }
                clear() {
                    return new BaggageImpl;
                }
            }
            t.BaggageImpl = BaggageImpl;
        },
        817: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.baggageEntryMetadataSymbol = void 0;
            t.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        },
        701: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.baggageEntryMetadataFromString = t.createBaggage = void 0;
            const n = r(741);
            const a = r(496);
            const o = r(817);
            const i = n.DiagAPI.instance();
            function createBaggage(e = {}) {
                return new a.BaggageImpl(new Map(Object.entries(e)));
            }
            t.createBaggage = createBaggage;
            function baggageEntryMetadataFromString(e) {
                if (typeof e !== "string") {
                    i.error(`Cannot create baggage metadata from unknown type: ${typeof e}`);
                    e = "";
                }
                return {
                    __TYPE__: o.baggageEntryMetadataSymbol,
                    toString () {
                        return e;
                    }
                };
            }
            t.baggageEntryMetadataFromString = baggageEntryMetadataFromString;
        },
        388: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.context = void 0;
            const n = r(339);
            t.context = n.ContextAPI.getInstance();
        },
        44: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopContextManager = void 0;
            const n = r(421);
            class NoopContextManager {
                active() {
                    return n.ROOT_CONTEXT;
                }
                with(e, t, r, ...n) {
                    return t.call(r, ...n);
                }
                bind(e, t) {
                    return t;
                }
                enable() {
                    return this;
                }
                disable() {
                    return this;
                }
            }
            t.NoopContextManager = NoopContextManager;
        },
        421: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ROOT_CONTEXT = t.createContextKey = void 0;
            function createContextKey(e) {
                return Symbol.for(e);
            }
            t.createContextKey = createContextKey;
            class BaseContext {
                constructor(e){
                    const t = this;
                    t._currentContext = e ? new Map(e) : new Map;
                    t.getValue = (e)=>t._currentContext.get(e);
                    t.setValue = (e, r)=>{
                        const n = new BaseContext(t._currentContext);
                        n._currentContext.set(e, r);
                        return n;
                    };
                    t.deleteValue = (e)=>{
                        const r = new BaseContext(t._currentContext);
                        r._currentContext.delete(e);
                        return r;
                    };
                }
            }
            t.ROOT_CONTEXT = new BaseContext;
        },
        920: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.diag = void 0;
            const n = r(741);
            t.diag = n.DiagAPI.instance();
        },
        144: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagComponentLogger = void 0;
            const n = r(38);
            class DiagComponentLogger {
                constructor(e){
                    this._namespace = e.namespace || "DiagComponentLogger";
                }
                debug(...e) {
                    return logProxy("debug", this._namespace, e);
                }
                error(...e) {
                    return logProxy("error", this._namespace, e);
                }
                info(...e) {
                    return logProxy("info", this._namespace, e);
                }
                warn(...e) {
                    return logProxy("warn", this._namespace, e);
                }
                verbose(...e) {
                    return logProxy("verbose", this._namespace, e);
                }
            }
            t.DiagComponentLogger = DiagComponentLogger;
            function logProxy(e, t, r) {
                const a = (0, n.getGlobal)("diag");
                if (!a) {
                    return;
                }
                r.unshift(t);
                return a[e](...r);
            }
        },
        689: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagConsoleLogger = void 0;
            const r = [
                {
                    n: "error",
                    c: "error"
                },
                {
                    n: "warn",
                    c: "warn"
                },
                {
                    n: "info",
                    c: "info"
                },
                {
                    n: "debug",
                    c: "debug"
                },
                {
                    n: "verbose",
                    c: "trace"
                }
            ];
            class DiagConsoleLogger {
                constructor(){
                    function _consoleFunc(e) {
                        return function(...t) {
                            if (console) {
                                let r = console[e];
                                if (typeof r !== "function") {
                                    r = console.log;
                                }
                                if (typeof r === "function") {
                                    return r.apply(console, t);
                                }
                            }
                        };
                    }
                    for(let e = 0; e < r.length; e++){
                        this[r[e].n] = _consoleFunc(r[e].c);
                    }
                }
            }
            t.DiagConsoleLogger = DiagConsoleLogger;
        },
        871: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.createLogLevelDiagLogger = void 0;
            const n = r(133);
            function createLogLevelDiagLogger(e, t) {
                if (e < n.DiagLogLevel.NONE) {
                    e = n.DiagLogLevel.NONE;
                } else if (e > n.DiagLogLevel.ALL) {
                    e = n.DiagLogLevel.ALL;
                }
                t = t || {};
                function _filterFunc(r, n) {
                    const a = t[r];
                    if (typeof a === "function" && e >= n) {
                        return a.bind(t);
                    }
                    return function() {};
                }
                return {
                    error: _filterFunc("error", n.DiagLogLevel.ERROR),
                    warn: _filterFunc("warn", n.DiagLogLevel.WARN),
                    info: _filterFunc("info", n.DiagLogLevel.INFO),
                    debug: _filterFunc("debug", n.DiagLogLevel.DEBUG),
                    verbose: _filterFunc("verbose", n.DiagLogLevel.VERBOSE)
                };
            }
            t.createLogLevelDiagLogger = createLogLevelDiagLogger;
        },
        133: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagLogLevel = void 0;
            var r;
            (function(e) {
                e[e["NONE"] = 0] = "NONE";
                e[e["ERROR"] = 30] = "ERROR";
                e[e["WARN"] = 50] = "WARN";
                e[e["INFO"] = 60] = "INFO";
                e[e["DEBUG"] = 70] = "DEBUG";
                e[e["VERBOSE"] = 80] = "VERBOSE";
                e[e["ALL"] = 9999] = "ALL";
            })(r = t.DiagLogLevel || (t.DiagLogLevel = {}));
        },
        38: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.unregisterGlobal = t.getGlobal = t.registerGlobal = void 0;
            const n = r(966);
            const a = r(520);
            const o = r(565);
            const i = a.VERSION.split(".")[0];
            const c = Symbol.for(`opentelemetry.js.api.${i}`);
            const s = n._globalThis;
            function registerGlobal(e, t, r, n = false) {
                var o;
                const i = s[c] = (o = s[c]) !== null && o !== void 0 ? o : {
                    version: a.VERSION
                };
                if (!n && i[e]) {
                    const t = new Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e}`);
                    r.error(t.stack || t.message);
                    return false;
                }
                if (i.version !== a.VERSION) {
                    const t = new Error(`@opentelemetry/api: Registration of version v${i.version} for ${e} does not match previously registered API v${a.VERSION}`);
                    r.error(t.stack || t.message);
                    return false;
                }
                i[e] = t;
                r.debug(`@opentelemetry/api: Registered a global for ${e} v${a.VERSION}.`);
                return true;
            }
            t.registerGlobal = registerGlobal;
            function getGlobal(e) {
                var t, r;
                const n = (t = s[c]) === null || t === void 0 ? void 0 : t.version;
                if (!n || !(0, o.isCompatible)(n)) {
                    return;
                }
                return (r = s[c]) === null || r === void 0 ? void 0 : r[e];
            }
            t.getGlobal = getGlobal;
            function unregisterGlobal(e, t) {
                t.debug(`@opentelemetry/api: Unregistering a global for ${e} v${a.VERSION}.`);
                const r = s[c];
                if (r) {
                    delete r[e];
                }
            }
            t.unregisterGlobal = unregisterGlobal;
        },
        565: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.isCompatible = t._makeCompatibilityCheck = void 0;
            const n = r(520);
            const a = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
            function _makeCompatibilityCheck(e) {
                const t = new Set([
                    e
                ]);
                const r = new Set;
                const n = e.match(a);
                if (!n) {
                    return ()=>false;
                }
                const o = {
                    major: +n[1],
                    minor: +n[2],
                    patch: +n[3],
                    prerelease: n[4]
                };
                if (o.prerelease != null) {
                    return function isExactmatch(t) {
                        return t === e;
                    };
                }
                function _reject(e) {
                    r.add(e);
                    return false;
                }
                function _accept(e) {
                    t.add(e);
                    return true;
                }
                return function isCompatible(e) {
                    if (t.has(e)) {
                        return true;
                    }
                    if (r.has(e)) {
                        return false;
                    }
                    const n = e.match(a);
                    if (!n) {
                        return _reject(e);
                    }
                    const i = {
                        major: +n[1],
                        minor: +n[2],
                        patch: +n[3],
                        prerelease: n[4]
                    };
                    if (i.prerelease != null) {
                        return _reject(e);
                    }
                    if (o.major !== i.major) {
                        return _reject(e);
                    }
                    if (o.major === 0) {
                        if (o.minor === i.minor && o.patch <= i.patch) {
                            return _accept(e);
                        }
                        return _reject(e);
                    }
                    if (o.minor <= i.minor) {
                        return _accept(e);
                    }
                    return _reject(e);
                };
            }
            t._makeCompatibilityCheck = _makeCompatibilityCheck;
            t.isCompatible = _makeCompatibilityCheck(n.VERSION);
        },
        934: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.metrics = void 0;
            const n = r(128);
            t.metrics = n.MetricsAPI.getInstance();
        },
        28: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ValueType = void 0;
            var r;
            (function(e) {
                e[e["INT"] = 0] = "INT";
                e[e["DOUBLE"] = 1] = "DOUBLE";
            })(r = t.ValueType || (t.ValueType = {}));
        },
        962: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.createNoopMeter = t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t.NOOP_OBSERVABLE_GAUGE_METRIC = t.NOOP_OBSERVABLE_COUNTER_METRIC = t.NOOP_UP_DOWN_COUNTER_METRIC = t.NOOP_HISTOGRAM_METRIC = t.NOOP_COUNTER_METRIC = t.NOOP_METER = t.NoopObservableUpDownCounterMetric = t.NoopObservableGaugeMetric = t.NoopObservableCounterMetric = t.NoopObservableMetric = t.NoopHistogramMetric = t.NoopUpDownCounterMetric = t.NoopCounterMetric = t.NoopMetric = t.NoopMeter = void 0;
            class NoopMeter {
                constructor(){}
                createHistogram(e, r) {
                    return t.NOOP_HISTOGRAM_METRIC;
                }
                createCounter(e, r) {
                    return t.NOOP_COUNTER_METRIC;
                }
                createUpDownCounter(e, r) {
                    return t.NOOP_UP_DOWN_COUNTER_METRIC;
                }
                createObservableGauge(e, r) {
                    return t.NOOP_OBSERVABLE_GAUGE_METRIC;
                }
                createObservableCounter(e, r) {
                    return t.NOOP_OBSERVABLE_COUNTER_METRIC;
                }
                createObservableUpDownCounter(e, r) {
                    return t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
                }
                addBatchObservableCallback(e, t) {}
                removeBatchObservableCallback(e) {}
            }
            t.NoopMeter = NoopMeter;
            class NoopMetric {
            }
            t.NoopMetric = NoopMetric;
            class NoopCounterMetric extends NoopMetric {
                add(e, t) {}
            }
            t.NoopCounterMetric = NoopCounterMetric;
            class NoopUpDownCounterMetric extends NoopMetric {
                add(e, t) {}
            }
            t.NoopUpDownCounterMetric = NoopUpDownCounterMetric;
            class NoopHistogramMetric extends NoopMetric {
                record(e, t) {}
            }
            t.NoopHistogramMetric = NoopHistogramMetric;
            class NoopObservableMetric {
                addCallback(e) {}
                removeCallback(e) {}
            }
            t.NoopObservableMetric = NoopObservableMetric;
            class NoopObservableCounterMetric extends NoopObservableMetric {
            }
            t.NoopObservableCounterMetric = NoopObservableCounterMetric;
            class NoopObservableGaugeMetric extends NoopObservableMetric {
            }
            t.NoopObservableGaugeMetric = NoopObservableGaugeMetric;
            class NoopObservableUpDownCounterMetric extends NoopObservableMetric {
            }
            t.NoopObservableUpDownCounterMetric = NoopObservableUpDownCounterMetric;
            t.NOOP_METER = new NoopMeter;
            t.NOOP_COUNTER_METRIC = new NoopCounterMetric;
            t.NOOP_HISTOGRAM_METRIC = new NoopHistogramMetric;
            t.NOOP_UP_DOWN_COUNTER_METRIC = new NoopUpDownCounterMetric;
            t.NOOP_OBSERVABLE_COUNTER_METRIC = new NoopObservableCounterMetric;
            t.NOOP_OBSERVABLE_GAUGE_METRIC = new NoopObservableGaugeMetric;
            t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new NoopObservableUpDownCounterMetric;
            function createNoopMeter() {
                return t.NOOP_METER;
            }
            t.createNoopMeter = createNoopMeter;
        },
        333: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NOOP_METER_PROVIDER = t.NoopMeterProvider = void 0;
            const n = r(962);
            class NoopMeterProvider {
                getMeter(e, t, r) {
                    return n.NOOP_METER;
                }
            }
            t.NoopMeterProvider = NoopMeterProvider;
            t.NOOP_METER_PROVIDER = new NoopMeterProvider;
        },
        966: function(e, t, r) {
            var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
                if (n === undefined) n = r;
                Object.defineProperty(e, n, {
                    enumerable: true,
                    get: function() {
                        return t[r];
                    }
                });
            } : function(e, t, r, n) {
                if (n === undefined) n = r;
                e[n] = t[r];
            });
            var a = this && this.__exportStar || function(e, t) {
                for(var r in e)if (r !== "default" && !Object.prototype.hasOwnProperty.call(t, r)) n(t, e, r);
            };
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            a(r(652), t);
        },
        385: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t._globalThis = void 0;
            t._globalThis = typeof globalThis === "object" ? globalThis : global;
        },
        652: function(e, t, r) {
            var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
                if (n === undefined) n = r;
                Object.defineProperty(e, n, {
                    enumerable: true,
                    get: function() {
                        return t[r];
                    }
                });
            } : function(e, t, r, n) {
                if (n === undefined) n = r;
                e[n] = t[r];
            });
            var a = this && this.__exportStar || function(e, t) {
                for(var r in e)if (r !== "default" && !Object.prototype.hasOwnProperty.call(t, r)) n(t, e, r);
            };
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            a(r(385), t);
        },
        251: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.propagation = void 0;
            const n = r(930);
            t.propagation = n.PropagationAPI.getInstance();
        },
        600: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopTextMapPropagator = void 0;
            class NoopTextMapPropagator {
                inject(e, t) {}
                extract(e, t) {
                    return e;
                }
                fields() {
                    return [];
                }
            }
            t.NoopTextMapPropagator = NoopTextMapPropagator;
        },
        625: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.defaultTextMapSetter = t.defaultTextMapGetter = void 0;
            t.defaultTextMapGetter = {
                get (e, t) {
                    if (e == null) {
                        return undefined;
                    }
                    return e[t];
                },
                keys (e) {
                    if (e == null) {
                        return [];
                    }
                    return Object.keys(e);
                }
            };
            t.defaultTextMapSetter = {
                set (e, t, r) {
                    if (e == null) {
                        return;
                    }
                    e[t] = r;
                }
            };
        },
        978: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.trace = void 0;
            const n = r(967);
            t.trace = n.TraceAPI.getInstance();
        },
        76: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NonRecordingSpan = void 0;
            const n = r(304);
            class NonRecordingSpan {
                constructor(e = n.INVALID_SPAN_CONTEXT){
                    this._spanContext = e;
                }
                spanContext() {
                    return this._spanContext;
                }
                setAttribute(e, t) {
                    return this;
                }
                setAttributes(e) {
                    return this;
                }
                addEvent(e, t) {
                    return this;
                }
                setStatus(e) {
                    return this;
                }
                updateName(e) {
                    return this;
                }
                end(e) {}
                isRecording() {
                    return false;
                }
                recordException(e, t) {}
            }
            t.NonRecordingSpan = NonRecordingSpan;
        },
        527: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopTracer = void 0;
            const n = r(339);
            const a = r(542);
            const o = r(76);
            const i = r(994);
            const c = n.ContextAPI.getInstance();
            class NoopTracer {
                startSpan(e, t, r = c.active()) {
                    const n = Boolean(t === null || t === void 0 ? void 0 : t.root);
                    if (n) {
                        return new o.NonRecordingSpan;
                    }
                    const s = r && (0, a.getSpanContext)(r);
                    if (isSpanContext(s) && (0, i.isSpanContextValid)(s)) {
                        return new o.NonRecordingSpan(s);
                    } else {
                        return new o.NonRecordingSpan;
                    }
                }
                startActiveSpan(e, t, r, n) {
                    let o;
                    let i;
                    let s;
                    if (arguments.length < 2) {
                        return;
                    } else if (arguments.length === 2) {
                        s = t;
                    } else if (arguments.length === 3) {
                        o = t;
                        s = r;
                    } else {
                        o = t;
                        i = r;
                        s = n;
                    }
                    const u = i !== null && i !== void 0 ? i : c.active();
                    const l = this.startSpan(e, o, u);
                    const g = (0, a.setSpan)(u, l);
                    return c.with(g, s, undefined, l);
                }
            }
            t.NoopTracer = NoopTracer;
            function isSpanContext(e) {
                return typeof e === "object" && typeof e["spanId"] === "string" && typeof e["traceId"] === "string" && typeof e["traceFlags"] === "number";
            }
        },
        228: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopTracerProvider = void 0;
            const n = r(527);
            class NoopTracerProvider {
                getTracer(e, t, r) {
                    return new n.NoopTracer;
                }
            }
            t.NoopTracerProvider = NoopTracerProvider;
        },
        387: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ProxyTracer = void 0;
            const n = r(527);
            const a = new n.NoopTracer;
            class ProxyTracer {
                constructor(e, t, r, n){
                    this._provider = e;
                    this.name = t;
                    this.version = r;
                    this.options = n;
                }
                startSpan(e, t, r) {
                    return this._getTracer().startSpan(e, t, r);
                }
                startActiveSpan(e, t, r, n) {
                    const a = this._getTracer();
                    return Reflect.apply(a.startActiveSpan, a, arguments);
                }
                _getTracer() {
                    if (this._delegate) {
                        return this._delegate;
                    }
                    const e = this._provider.getDelegateTracer(this.name, this.version, this.options);
                    if (!e) {
                        return a;
                    }
                    this._delegate = e;
                    return this._delegate;
                }
            }
            t.ProxyTracer = ProxyTracer;
        },
        414: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ProxyTracerProvider = void 0;
            const n = r(387);
            const a = r(228);
            const o = new a.NoopTracerProvider;
            class ProxyTracerProvider {
                getTracer(e, t, r) {
                    var a;
                    return (a = this.getDelegateTracer(e, t, r)) !== null && a !== void 0 ? a : new n.ProxyTracer(this, e, t, r);
                }
                getDelegate() {
                    var e;
                    return (e = this._delegate) !== null && e !== void 0 ? e : o;
                }
                setDelegate(e) {
                    this._delegate = e;
                }
                getDelegateTracer(e, t, r) {
                    var n;
                    return (n = this._delegate) === null || n === void 0 ? void 0 : n.getTracer(e, t, r);
                }
            }
            t.ProxyTracerProvider = ProxyTracerProvider;
        },
        505: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.SamplingDecision = void 0;
            var r;
            (function(e) {
                e[e["NOT_RECORD"] = 0] = "NOT_RECORD";
                e[e["RECORD"] = 1] = "RECORD";
                e[e["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
            })(r = t.SamplingDecision || (t.SamplingDecision = {}));
        },
        542: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.getSpanContext = t.setSpanContext = t.deleteSpan = t.setSpan = t.getActiveSpan = t.getSpan = void 0;
            const n = r(421);
            const a = r(76);
            const o = r(339);
            const i = (0, n.createContextKey)("OpenTelemetry Context Key SPAN");
            function getSpan(e) {
                return e.getValue(i) || undefined;
            }
            t.getSpan = getSpan;
            function getActiveSpan() {
                return getSpan(o.ContextAPI.getInstance().active());
            }
            t.getActiveSpan = getActiveSpan;
            function setSpan(e, t) {
                return e.setValue(i, t);
            }
            t.setSpan = setSpan;
            function deleteSpan(e) {
                return e.deleteValue(i);
            }
            t.deleteSpan = deleteSpan;
            function setSpanContext(e, t) {
                return setSpan(e, new a.NonRecordingSpan(t));
            }
            t.setSpanContext = setSpanContext;
            function getSpanContext(e) {
                var t;
                return (t = getSpan(e)) === null || t === void 0 ? void 0 : t.spanContext();
            }
            t.getSpanContext = getSpanContext;
        },
        430: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.TraceStateImpl = void 0;
            const n = r(450);
            const a = 32;
            const o = 512;
            const i = ",";
            const c = "=";
            class TraceStateImpl {
                constructor(e){
                    this._internalState = new Map;
                    if (e) this._parse(e);
                }
                set(e, t) {
                    const r = this._clone();
                    if (r._internalState.has(e)) {
                        r._internalState.delete(e);
                    }
                    r._internalState.set(e, t);
                    return r;
                }
                unset(e) {
                    const t = this._clone();
                    t._internalState.delete(e);
                    return t;
                }
                get(e) {
                    return this._internalState.get(e);
                }
                serialize() {
                    return this._keys().reduce((e, t)=>{
                        e.push(t + c + this.get(t));
                        return e;
                    }, []).join(i);
                }
                _parse(e) {
                    if (e.length > o) return;
                    this._internalState = e.split(i).reverse().reduce((e, t)=>{
                        const r = t.trim();
                        const a = r.indexOf(c);
                        if (a !== -1) {
                            const o = r.slice(0, a);
                            const i = r.slice(a + 1, t.length);
                            if ((0, n.validateKey)(o) && (0, n.validateValue)(i)) {
                                e.set(o, i);
                            } else {}
                        }
                        return e;
                    }, new Map);
                    if (this._internalState.size > a) {
                        this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, a));
                    }
                }
                _keys() {
                    return Array.from(this._internalState.keys()).reverse();
                }
                _clone() {
                    const e = new TraceStateImpl;
                    e._internalState = new Map(this._internalState);
                    return e;
                }
            }
            t.TraceStateImpl = TraceStateImpl;
        },
        450: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.validateValue = t.validateKey = void 0;
            const r = "[_0-9a-z-*/]";
            const n = `[a-z]${r}{0,255}`;
            const a = `[a-z0-9]${r}{0,240}@[a-z]${r}{0,13}`;
            const o = new RegExp(`^(?:${n}|${a})$`);
            const i = /^[ -~]{0,255}[!-~]$/;
            const c = /,|=/;
            function validateKey(e) {
                return o.test(e);
            }
            t.validateKey = validateKey;
            function validateValue(e) {
                return i.test(e) && !c.test(e);
            }
            t.validateValue = validateValue;
        },
        757: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.createTraceState = void 0;
            const n = r(430);
            function createTraceState(e) {
                return new n.TraceStateImpl(e);
            }
            t.createTraceState = createTraceState;
        },
        304: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.INVALID_SPAN_CONTEXT = t.INVALID_TRACEID = t.INVALID_SPANID = void 0;
            const n = r(762);
            t.INVALID_SPANID = "0000000000000000";
            t.INVALID_TRACEID = "00000000000000000000000000000000";
            t.INVALID_SPAN_CONTEXT = {
                traceId: t.INVALID_TRACEID,
                spanId: t.INVALID_SPANID,
                traceFlags: n.TraceFlags.NONE
            };
        },
        902: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.SpanKind = void 0;
            var r;
            (function(e) {
                e[e["INTERNAL"] = 0] = "INTERNAL";
                e[e["SERVER"] = 1] = "SERVER";
                e[e["CLIENT"] = 2] = "CLIENT";
                e[e["PRODUCER"] = 3] = "PRODUCER";
                e[e["CONSUMER"] = 4] = "CONSUMER";
            })(r = t.SpanKind || (t.SpanKind = {}));
        },
        994: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.wrapSpanContext = t.isSpanContextValid = t.isValidSpanId = t.isValidTraceId = void 0;
            const n = r(304);
            const a = r(76);
            const o = /^([0-9a-f]{32})$/i;
            const i = /^[0-9a-f]{16}$/i;
            function isValidTraceId(e) {
                return o.test(e) && e !== n.INVALID_TRACEID;
            }
            t.isValidTraceId = isValidTraceId;
            function isValidSpanId(e) {
                return i.test(e) && e !== n.INVALID_SPANID;
            }
            t.isValidSpanId = isValidSpanId;
            function isSpanContextValid(e) {
                return isValidTraceId(e.traceId) && isValidSpanId(e.spanId);
            }
            t.isSpanContextValid = isSpanContextValid;
            function wrapSpanContext(e) {
                return new a.NonRecordingSpan(e);
            }
            t.wrapSpanContext = wrapSpanContext;
        },
        832: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.SpanStatusCode = void 0;
            var r;
            (function(e) {
                e[e["UNSET"] = 0] = "UNSET";
                e[e["OK"] = 1] = "OK";
                e[e["ERROR"] = 2] = "ERROR";
            })(r = t.SpanStatusCode || (t.SpanStatusCode = {}));
        },
        762: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.TraceFlags = void 0;
            var r;
            (function(e) {
                e[e["NONE"] = 0] = "NONE";
                e[e["SAMPLED"] = 1] = "SAMPLED";
            })(r = t.TraceFlags || (t.TraceFlags = {}));
        },
        520: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.VERSION = void 0;
            t.VERSION = "1.4.1";
        }
    };
    var t = {};
    function __nccwpck_require__(r) {
        var n = t[r];
        if (n !== undefined) {
            return n.exports;
        }
        var a = t[r] = {
            exports: {}
        };
        var o = true;
        try {
            e[r].call(a.exports, a, a.exports, __nccwpck_require__);
            o = false;
        } finally{
            if (o) delete t[r];
        }
        return a.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
    var r = {};
    (()=>{
        var e = r;
        Object.defineProperty(e, "__esModule", {
            value: true
        });
        e.trace = e.propagation = e.metrics = e.diag = e.context = e.INVALID_SPAN_CONTEXT = e.INVALID_TRACEID = e.INVALID_SPANID = e.isValidSpanId = e.isValidTraceId = e.isSpanContextValid = e.createTraceState = e.TraceFlags = e.SpanStatusCode = e.SpanKind = e.SamplingDecision = e.ProxyTracerProvider = e.ProxyTracer = e.defaultTextMapSetter = e.defaultTextMapGetter = e.ValueType = e.createNoopMeter = e.DiagLogLevel = e.DiagConsoleLogger = e.ROOT_CONTEXT = e.createContextKey = e.baggageEntryMetadataFromString = void 0;
        var t = __nccwpck_require__(701);
        Object.defineProperty(e, "baggageEntryMetadataFromString", {
            enumerable: true,
            get: function() {
                return t.baggageEntryMetadataFromString;
            }
        });
        var n = __nccwpck_require__(421);
        Object.defineProperty(e, "createContextKey", {
            enumerable: true,
            get: function() {
                return n.createContextKey;
            }
        });
        Object.defineProperty(e, "ROOT_CONTEXT", {
            enumerable: true,
            get: function() {
                return n.ROOT_CONTEXT;
            }
        });
        var a = __nccwpck_require__(689);
        Object.defineProperty(e, "DiagConsoleLogger", {
            enumerable: true,
            get: function() {
                return a.DiagConsoleLogger;
            }
        });
        var o = __nccwpck_require__(133);
        Object.defineProperty(e, "DiagLogLevel", {
            enumerable: true,
            get: function() {
                return o.DiagLogLevel;
            }
        });
        var i = __nccwpck_require__(962);
        Object.defineProperty(e, "createNoopMeter", {
            enumerable: true,
            get: function() {
                return i.createNoopMeter;
            }
        });
        var c = __nccwpck_require__(28);
        Object.defineProperty(e, "ValueType", {
            enumerable: true,
            get: function() {
                return c.ValueType;
            }
        });
        var s = __nccwpck_require__(625);
        Object.defineProperty(e, "defaultTextMapGetter", {
            enumerable: true,
            get: function() {
                return s.defaultTextMapGetter;
            }
        });
        Object.defineProperty(e, "defaultTextMapSetter", {
            enumerable: true,
            get: function() {
                return s.defaultTextMapSetter;
            }
        });
        var u = __nccwpck_require__(387);
        Object.defineProperty(e, "ProxyTracer", {
            enumerable: true,
            get: function() {
                return u.ProxyTracer;
            }
        });
        var l = __nccwpck_require__(414);
        Object.defineProperty(e, "ProxyTracerProvider", {
            enumerable: true,
            get: function() {
                return l.ProxyTracerProvider;
            }
        });
        var g = __nccwpck_require__(505);
        Object.defineProperty(e, "SamplingDecision", {
            enumerable: true,
            get: function() {
                return g.SamplingDecision;
            }
        });
        var p = __nccwpck_require__(902);
        Object.defineProperty(e, "SpanKind", {
            enumerable: true,
            get: function() {
                return p.SpanKind;
            }
        });
        var d = __nccwpck_require__(832);
        Object.defineProperty(e, "SpanStatusCode", {
            enumerable: true,
            get: function() {
                return d.SpanStatusCode;
            }
        });
        var _ = __nccwpck_require__(762);
        Object.defineProperty(e, "TraceFlags", {
            enumerable: true,
            get: function() {
                return _.TraceFlags;
            }
        });
        var f = __nccwpck_require__(757);
        Object.defineProperty(e, "createTraceState", {
            enumerable: true,
            get: function() {
                return f.createTraceState;
            }
        });
        var b = __nccwpck_require__(994);
        Object.defineProperty(e, "isSpanContextValid", {
            enumerable: true,
            get: function() {
                return b.isSpanContextValid;
            }
        });
        Object.defineProperty(e, "isValidTraceId", {
            enumerable: true,
            get: function() {
                return b.isValidTraceId;
            }
        });
        Object.defineProperty(e, "isValidSpanId", {
            enumerable: true,
            get: function() {
                return b.isValidSpanId;
            }
        });
        var v = __nccwpck_require__(304);
        Object.defineProperty(e, "INVALID_SPANID", {
            enumerable: true,
            get: function() {
                return v.INVALID_SPANID;
            }
        });
        Object.defineProperty(e, "INVALID_TRACEID", {
            enumerable: true,
            get: function() {
                return v.INVALID_TRACEID;
            }
        });
        Object.defineProperty(e, "INVALID_SPAN_CONTEXT", {
            enumerable: true,
            get: function() {
                return v.INVALID_SPAN_CONTEXT;
            }
        });
        const O = __nccwpck_require__(388);
        Object.defineProperty(e, "context", {
            enumerable: true,
            get: function() {
                return O.context;
            }
        });
        const P = __nccwpck_require__(920);
        Object.defineProperty(e, "diag", {
            enumerable: true,
            get: function() {
                return P.diag;
            }
        });
        const N = __nccwpck_require__(934);
        Object.defineProperty(e, "metrics", {
            enumerable: true,
            get: function() {
                return N.metrics;
            }
        });
        const S = __nccwpck_require__(251);
        Object.defineProperty(e, "propagation", {
            enumerable: true,
            get: function() {
                return S.propagation;
            }
        });
        const C = __nccwpck_require__(978);
        Object.defineProperty(e, "trace", {
            enumerable: true,
            get: function() {
                return C.trace;
            }
        });
        e["default"] = {
            context: O.context,
            diag: P.diag,
            metrics: N.metrics,
            propagation: S.propagation,
            trace: C.trace
        };
    })();
    module.exports = r;
})();


/***/ }),

/***/ 6777:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


(()=>{
    var r = {
        535: (r, e, n)=>{
            "use strict";
            r = n.nmd(r);
            const t = n(54);
            const wrapAnsi16 = (r, e)=>function() {
                    const n = r.apply(t, arguments);
                    return `[${n + e}m`;
                };
            const wrapAnsi256 = (r, e)=>function() {
                    const n = r.apply(t, arguments);
                    return `[${38 + e};5;${n}m`;
                };
            const wrapAnsi16m = (r, e)=>function() {
                    const n = r.apply(t, arguments);
                    return `[${38 + e};2;${n[0]};${n[1]};${n[2]}m`;
                };
            function assembleStyles() {
                const r = new Map;
                const e = {
                    modifier: {
                        reset: [
                            0,
                            0
                        ],
                        bold: [
                            1,
                            22
                        ],
                        dim: [
                            2,
                            22
                        ],
                        italic: [
                            3,
                            23
                        ],
                        underline: [
                            4,
                            24
                        ],
                        inverse: [
                            7,
                            27
                        ],
                        hidden: [
                            8,
                            28
                        ],
                        strikethrough: [
                            9,
                            29
                        ]
                    },
                    color: {
                        black: [
                            30,
                            39
                        ],
                        red: [
                            31,
                            39
                        ],
                        green: [
                            32,
                            39
                        ],
                        yellow: [
                            33,
                            39
                        ],
                        blue: [
                            34,
                            39
                        ],
                        magenta: [
                            35,
                            39
                        ],
                        cyan: [
                            36,
                            39
                        ],
                        white: [
                            37,
                            39
                        ],
                        gray: [
                            90,
                            39
                        ],
                        redBright: [
                            91,
                            39
                        ],
                        greenBright: [
                            92,
                            39
                        ],
                        yellowBright: [
                            93,
                            39
                        ],
                        blueBright: [
                            94,
                            39
                        ],
                        magentaBright: [
                            95,
                            39
                        ],
                        cyanBright: [
                            96,
                            39
                        ],
                        whiteBright: [
                            97,
                            39
                        ]
                    },
                    bgColor: {
                        bgBlack: [
                            40,
                            49
                        ],
                        bgRed: [
                            41,
                            49
                        ],
                        bgGreen: [
                            42,
                            49
                        ],
                        bgYellow: [
                            43,
                            49
                        ],
                        bgBlue: [
                            44,
                            49
                        ],
                        bgMagenta: [
                            45,
                            49
                        ],
                        bgCyan: [
                            46,
                            49
                        ],
                        bgWhite: [
                            47,
                            49
                        ],
                        bgBlackBright: [
                            100,
                            49
                        ],
                        bgRedBright: [
                            101,
                            49
                        ],
                        bgGreenBright: [
                            102,
                            49
                        ],
                        bgYellowBright: [
                            103,
                            49
                        ],
                        bgBlueBright: [
                            104,
                            49
                        ],
                        bgMagentaBright: [
                            105,
                            49
                        ],
                        bgCyanBright: [
                            106,
                            49
                        ],
                        bgWhiteBright: [
                            107,
                            49
                        ]
                    }
                };
                e.color.grey = e.color.gray;
                for (const n of Object.keys(e)){
                    const t = e[n];
                    for (const n of Object.keys(t)){
                        const a = t[n];
                        e[n] = {
                            open: `[${a[0]}m`,
                            close: `[${a[1]}m`
                        };
                        t[n] = e[n];
                        r.set(a[0], a[1]);
                    }
                    Object.defineProperty(e, n, {
                        value: t,
                        enumerable: false
                    });
                    Object.defineProperty(e, "codes", {
                        value: r,
                        enumerable: false
                    });
                }
                const ansi2ansi = (r)=>r;
                const rgb2rgb = (r, e, n)=>[
                        r,
                        e,
                        n
                    ];
                e.color.close = "\x1b[39m";
                e.bgColor.close = "\x1b[49m";
                e.color.ansi = {
                    ansi: wrapAnsi16(ansi2ansi, 0)
                };
                e.color.ansi256 = {
                    ansi256: wrapAnsi256(ansi2ansi, 0)
                };
                e.color.ansi16m = {
                    rgb: wrapAnsi16m(rgb2rgb, 0)
                };
                e.bgColor.ansi = {
                    ansi: wrapAnsi16(ansi2ansi, 10)
                };
                e.bgColor.ansi256 = {
                    ansi256: wrapAnsi256(ansi2ansi, 10)
                };
                e.bgColor.ansi16m = {
                    rgb: wrapAnsi16m(rgb2rgb, 10)
                };
                for (let r of Object.keys(t)){
                    if (typeof t[r] !== "object") {
                        continue;
                    }
                    const n = t[r];
                    if (r === "ansi16") {
                        r = "ansi";
                    }
                    if ("ansi16" in n) {
                        e.color.ansi[r] = wrapAnsi16(n.ansi16, 0);
                        e.bgColor.ansi[r] = wrapAnsi16(n.ansi16, 10);
                    }
                    if ("ansi256" in n) {
                        e.color.ansi256[r] = wrapAnsi256(n.ansi256, 0);
                        e.bgColor.ansi256[r] = wrapAnsi256(n.ansi256, 10);
                    }
                    if ("rgb" in n) {
                        e.color.ansi16m[r] = wrapAnsi16m(n.rgb, 0);
                        e.bgColor.ansi16m[r] = wrapAnsi16m(n.rgb, 10);
                    }
                }
                return e;
            }
            Object.defineProperty(r, "exports", {
                enumerable: true,
                get: assembleStyles
            });
        },
        148: (r, e, n)=>{
            "use strict";
            const t = n(379);
            const a = n(535);
            const o = n(220).stdout;
            const s = n(299);
            const l = process.platform === "win32" && !(process.env.TERM || "").toLowerCase().startsWith("xterm");
            const i = [
                "ansi",
                "ansi",
                "ansi256",
                "ansi16m"
            ];
            const c = new Set([
                "gray"
            ]);
            const u = Object.create(null);
            function applyOptions(r, e) {
                e = e || {};
                const n = o ? o.level : 0;
                r.level = e.level === undefined ? n : e.level;
                r.enabled = "enabled" in e ? e.enabled : r.level > 0;
            }
            function Chalk(r) {
                if (!this || !(this instanceof Chalk) || this.template) {
                    const e = {};
                    applyOptions(e, r);
                    e.template = function() {
                        const r = [].slice.call(arguments);
                        return chalkTag.apply(null, [
                            e.template
                        ].concat(r));
                    };
                    Object.setPrototypeOf(e, Chalk.prototype);
                    Object.setPrototypeOf(e.template, e);
                    e.template.constructor = Chalk;
                    return e.template;
                }
                applyOptions(this, r);
            }
            if (l) {
                a.blue.open = "\x1b[94m";
            }
            for (const r of Object.keys(a)){
                a[r].closeRe = new RegExp(t(a[r].close), "g");
                u[r] = {
                    get () {
                        const e = a[r];
                        return build.call(this, this._styles ? this._styles.concat(e) : [
                            e
                        ], this._empty, r);
                    }
                };
            }
            u.visible = {
                get () {
                    return build.call(this, this._styles || [], true, "visible");
                }
            };
            a.color.closeRe = new RegExp(t(a.color.close), "g");
            for (const r of Object.keys(a.color.ansi)){
                if (c.has(r)) {
                    continue;
                }
                u[r] = {
                    get () {
                        const e = this.level;
                        return function() {
                            const n = a.color[i[e]][r].apply(null, arguments);
                            const t = {
                                open: n,
                                close: a.color.close,
                                closeRe: a.color.closeRe
                            };
                            return build.call(this, this._styles ? this._styles.concat(t) : [
                                t
                            ], this._empty, r);
                        };
                    }
                };
            }
            a.bgColor.closeRe = new RegExp(t(a.bgColor.close), "g");
            for (const r of Object.keys(a.bgColor.ansi)){
                if (c.has(r)) {
                    continue;
                }
                const e = "bg" + r[0].toUpperCase() + r.slice(1);
                u[e] = {
                    get () {
                        const e = this.level;
                        return function() {
                            const n = a.bgColor[i[e]][r].apply(null, arguments);
                            const t = {
                                open: n,
                                close: a.bgColor.close,
                                closeRe: a.bgColor.closeRe
                            };
                            return build.call(this, this._styles ? this._styles.concat(t) : [
                                t
                            ], this._empty, r);
                        };
                    }
                };
            }
            const v = Object.defineProperties(()=>{}, u);
            function build(r, e, n) {
                const builder = function() {
                    return applyStyle.apply(builder, arguments);
                };
                builder._styles = r;
                builder._empty = e;
                const t = this;
                Object.defineProperty(builder, "level", {
                    enumerable: true,
                    get () {
                        return t.level;
                    },
                    set (r) {
                        t.level = r;
                    }
                });
                Object.defineProperty(builder, "enabled", {
                    enumerable: true,
                    get () {
                        return t.enabled;
                    },
                    set (r) {
                        t.enabled = r;
                    }
                });
                builder.hasGrey = this.hasGrey || n === "gray" || n === "grey";
                builder.__proto__ = v;
                return builder;
            }
            function applyStyle() {
                const r = arguments;
                const e = r.length;
                let n = String(arguments[0]);
                if (e === 0) {
                    return "";
                }
                if (e > 1) {
                    for(let t = 1; t < e; t++){
                        n += " " + r[t];
                    }
                }
                if (!this.enabled || this.level <= 0 || !n) {
                    return this._empty ? "" : n;
                }
                const t = a.dim.open;
                if (l && this.hasGrey) {
                    a.dim.open = "";
                }
                for (const r of this._styles.slice().reverse()){
                    n = r.open + n.replace(r.closeRe, r.open) + r.close;
                    n = n.replace(/\r?\n/g, `${r.close}$&${r.open}`);
                }
                a.dim.open = t;
                return n;
            }
            function chalkTag(r, e) {
                if (!Array.isArray(e)) {
                    return [].slice.call(arguments, 1).join(" ");
                }
                const n = [].slice.call(arguments, 2);
                const t = [
                    e.raw[0]
                ];
                for(let r = 1; r < e.length; r++){
                    t.push(String(n[r - 1]).replace(/[{}\\]/g, "\\$&"));
                    t.push(String(e.raw[r]));
                }
                return s(r, t.join(""));
            }
            Object.defineProperties(Chalk.prototype, u);
            r.exports = Chalk();
            r.exports.supportsColor = o;
            r.exports["default"] = r.exports;
        },
        299: (r)=>{
            "use strict";
            const e = /(?:\\(u[a-f\d]{4}|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
            const n = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
            const t = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
            const a = /\\(u[a-f\d]{4}|x[a-f\d]{2}|.)|([^\\])/gi;
            const o = new Map([
                [
                    "n",
                    "\n"
                ],
                [
                    "r",
                    "\r"
                ],
                [
                    "t",
                    "	"
                ],
                [
                    "b",
                    "\b"
                ],
                [
                    "f",
                    "\f"
                ],
                [
                    "v",
                    "\v"
                ],
                [
                    "0",
                    "\x00"
                ],
                [
                    "\\",
                    "\\"
                ],
                [
                    "e",
                    "\x1b"
                ],
                [
                    "a",
                    "\x07"
                ]
            ]);
            function unescape(r) {
                if (r[0] === "u" && r.length === 5 || r[0] === "x" && r.length === 3) {
                    return String.fromCharCode(parseInt(r.slice(1), 16));
                }
                return o.get(r) || r;
            }
            function parseArguments(r, e) {
                const n = [];
                const o = e.trim().split(/\s*,\s*/g);
                let s;
                for (const e of o){
                    if (!isNaN(e)) {
                        n.push(Number(e));
                    } else if (s = e.match(t)) {
                        n.push(s[2].replace(a, (r, e, n)=>e ? unescape(e) : n));
                    } else {
                        throw new Error(`Invalid Chalk template style argument: ${e} (in style '${r}')`);
                    }
                }
                return n;
            }
            function parseStyle(r) {
                n.lastIndex = 0;
                const e = [];
                let t;
                while((t = n.exec(r)) !== null){
                    const r = t[1];
                    if (t[2]) {
                        const n = parseArguments(r, t[2]);
                        e.push([
                            r
                        ].concat(n));
                    } else {
                        e.push([
                            r
                        ]);
                    }
                }
                return e;
            }
            function buildStyle(r, e) {
                const n = {};
                for (const r of e){
                    for (const e of r.styles){
                        n[e[0]] = r.inverse ? null : e.slice(1);
                    }
                }
                let t = r;
                for (const r of Object.keys(n)){
                    if (Array.isArray(n[r])) {
                        if (!(r in t)) {
                            throw new Error(`Unknown Chalk style: ${r}`);
                        }
                        if (n[r].length > 0) {
                            t = t[r].apply(t, n[r]);
                        } else {
                            t = t[r];
                        }
                    }
                }
                return t;
            }
            r.exports = (r, n)=>{
                const t = [];
                const a = [];
                let o = [];
                n.replace(e, (e, n, s, l, i, c)=>{
                    if (n) {
                        o.push(unescape(n));
                    } else if (l) {
                        const e = o.join("");
                        o = [];
                        a.push(t.length === 0 ? e : buildStyle(r, t)(e));
                        t.push({
                            inverse: s,
                            styles: parseStyle(l)
                        });
                    } else if (i) {
                        if (t.length === 0) {
                            throw new Error("Found extraneous } in Chalk template literal");
                        }
                        a.push(buildStyle(r, t)(o.join("")));
                        o = [];
                        t.pop();
                    } else {
                        o.push(c);
                    }
                });
                a.push(o.join(""));
                if (t.length > 0) {
                    const r = `Chalk template literal is missing ${t.length} closing bracket${t.length === 1 ? "" : "s"} (\`}\`)`;
                    throw new Error(r);
                }
                return a.join("");
            };
        },
        117: (r, e, n)=>{
            var t = n(251);
            var a = {};
            for(var o in t){
                if (t.hasOwnProperty(o)) {
                    a[t[o]] = o;
                }
            }
            var s = r.exports = {
                rgb: {
                    channels: 3,
                    labels: "rgb"
                },
                hsl: {
                    channels: 3,
                    labels: "hsl"
                },
                hsv: {
                    channels: 3,
                    labels: "hsv"
                },
                hwb: {
                    channels: 3,
                    labels: "hwb"
                },
                cmyk: {
                    channels: 4,
                    labels: "cmyk"
                },
                xyz: {
                    channels: 3,
                    labels: "xyz"
                },
                lab: {
                    channels: 3,
                    labels: "lab"
                },
                lch: {
                    channels: 3,
                    labels: "lch"
                },
                hex: {
                    channels: 1,
                    labels: [
                        "hex"
                    ]
                },
                keyword: {
                    channels: 1,
                    labels: [
                        "keyword"
                    ]
                },
                ansi16: {
                    channels: 1,
                    labels: [
                        "ansi16"
                    ]
                },
                ansi256: {
                    channels: 1,
                    labels: [
                        "ansi256"
                    ]
                },
                hcg: {
                    channels: 3,
                    labels: [
                        "h",
                        "c",
                        "g"
                    ]
                },
                apple: {
                    channels: 3,
                    labels: [
                        "r16",
                        "g16",
                        "b16"
                    ]
                },
                gray: {
                    channels: 1,
                    labels: [
                        "gray"
                    ]
                }
            };
            for(var l in s){
                if (s.hasOwnProperty(l)) {
                    if (!("channels" in s[l])) {
                        throw new Error("missing channels property: " + l);
                    }
                    if (!("labels" in s[l])) {
                        throw new Error("missing channel labels property: " + l);
                    }
                    if (s[l].labels.length !== s[l].channels) {
                        throw new Error("channel and label counts mismatch: " + l);
                    }
                    var i = s[l].channels;
                    var c = s[l].labels;
                    delete s[l].channels;
                    delete s[l].labels;
                    Object.defineProperty(s[l], "channels", {
                        value: i
                    });
                    Object.defineProperty(s[l], "labels", {
                        value: c
                    });
                }
            }
            s.rgb.hsl = function(r) {
                var e = r[0] / 255;
                var n = r[1] / 255;
                var t = r[2] / 255;
                var a = Math.min(e, n, t);
                var o = Math.max(e, n, t);
                var s = o - a;
                var l;
                var i;
                var c;
                if (o === a) {
                    l = 0;
                } else if (e === o) {
                    l = (n - t) / s;
                } else if (n === o) {
                    l = 2 + (t - e) / s;
                } else if (t === o) {
                    l = 4 + (e - n) / s;
                }
                l = Math.min(l * 60, 360);
                if (l < 0) {
                    l += 360;
                }
                c = (a + o) / 2;
                if (o === a) {
                    i = 0;
                } else if (c <= .5) {
                    i = s / (o + a);
                } else {
                    i = s / (2 - o - a);
                }
                return [
                    l,
                    i * 100,
                    c * 100
                ];
            };
            s.rgb.hsv = function(r) {
                var e;
                var n;
                var t;
                var a;
                var o;
                var s = r[0] / 255;
                var l = r[1] / 255;
                var i = r[2] / 255;
                var c = Math.max(s, l, i);
                var u = c - Math.min(s, l, i);
                var diffc = function(r) {
                    return (c - r) / 6 / u + 1 / 2;
                };
                if (u === 0) {
                    a = o = 0;
                } else {
                    o = u / c;
                    e = diffc(s);
                    n = diffc(l);
                    t = diffc(i);
                    if (s === c) {
                        a = t - n;
                    } else if (l === c) {
                        a = 1 / 3 + e - t;
                    } else if (i === c) {
                        a = 2 / 3 + n - e;
                    }
                    if (a < 0) {
                        a += 1;
                    } else if (a > 1) {
                        a -= 1;
                    }
                }
                return [
                    a * 360,
                    o * 100,
                    c * 100
                ];
            };
            s.rgb.hwb = function(r) {
                var e = r[0];
                var n = r[1];
                var t = r[2];
                var a = s.rgb.hsl(r)[0];
                var o = 1 / 255 * Math.min(e, Math.min(n, t));
                t = 1 - 1 / 255 * Math.max(e, Math.max(n, t));
                return [
                    a,
                    o * 100,
                    t * 100
                ];
            };
            s.rgb.cmyk = function(r) {
                var e = r[0] / 255;
                var n = r[1] / 255;
                var t = r[2] / 255;
                var a;
                var o;
                var s;
                var l;
                l = Math.min(1 - e, 1 - n, 1 - t);
                a = (1 - e - l) / (1 - l) || 0;
                o = (1 - n - l) / (1 - l) || 0;
                s = (1 - t - l) / (1 - l) || 0;
                return [
                    a * 100,
                    o * 100,
                    s * 100,
                    l * 100
                ];
            };
            function comparativeDistance(r, e) {
                return Math.pow(r[0] - e[0], 2) + Math.pow(r[1] - e[1], 2) + Math.pow(r[2] - e[2], 2);
            }
            s.rgb.keyword = function(r) {
                var e = a[r];
                if (e) {
                    return e;
                }
                var n = Infinity;
                var o;
                for(var s in t){
                    if (t.hasOwnProperty(s)) {
                        var l = t[s];
                        var i = comparativeDistance(r, l);
                        if (i < n) {
                            n = i;
                            o = s;
                        }
                    }
                }
                return o;
            };
            s.keyword.rgb = function(r) {
                return t[r];
            };
            s.rgb.xyz = function(r) {
                var e = r[0] / 255;
                var n = r[1] / 255;
                var t = r[2] / 255;
                e = e > .04045 ? Math.pow((e + .055) / 1.055, 2.4) : e / 12.92;
                n = n > .04045 ? Math.pow((n + .055) / 1.055, 2.4) : n / 12.92;
                t = t > .04045 ? Math.pow((t + .055) / 1.055, 2.4) : t / 12.92;
                var a = e * .4124 + n * .3576 + t * .1805;
                var o = e * .2126 + n * .7152 + t * .0722;
                var s = e * .0193 + n * .1192 + t * .9505;
                return [
                    a * 100,
                    o * 100,
                    s * 100
                ];
            };
            s.rgb.lab = function(r) {
                var e = s.rgb.xyz(r);
                var n = e[0];
                var t = e[1];
                var a = e[2];
                var o;
                var l;
                var i;
                n /= 95.047;
                t /= 100;
                a /= 108.883;
                n = n > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116;
                t = t > .008856 ? Math.pow(t, 1 / 3) : 7.787 * t + 16 / 116;
                a = a > .008856 ? Math.pow(a, 1 / 3) : 7.787 * a + 16 / 116;
                o = 116 * t - 16;
                l = 500 * (n - t);
                i = 200 * (t - a);
                return [
                    o,
                    l,
                    i
                ];
            };
            s.hsl.rgb = function(r) {
                var e = r[0] / 360;
                var n = r[1] / 100;
                var t = r[2] / 100;
                var a;
                var o;
                var s;
                var l;
                var i;
                if (n === 0) {
                    i = t * 255;
                    return [
                        i,
                        i,
                        i
                    ];
                }
                if (t < .5) {
                    o = t * (1 + n);
                } else {
                    o = t + n - t * n;
                }
                a = 2 * t - o;
                l = [
                    0,
                    0,
                    0
                ];
                for(var c = 0; c < 3; c++){
                    s = e + 1 / 3 * -(c - 1);
                    if (s < 0) {
                        s++;
                    }
                    if (s > 1) {
                        s--;
                    }
                    if (6 * s < 1) {
                        i = a + (o - a) * 6 * s;
                    } else if (2 * s < 1) {
                        i = o;
                    } else if (3 * s < 2) {
                        i = a + (o - a) * (2 / 3 - s) * 6;
                    } else {
                        i = a;
                    }
                    l[c] = i * 255;
                }
                return l;
            };
            s.hsl.hsv = function(r) {
                var e = r[0];
                var n = r[1] / 100;
                var t = r[2] / 100;
                var a = n;
                var o = Math.max(t, .01);
                var s;
                var l;
                t *= 2;
                n *= t <= 1 ? t : 2 - t;
                a *= o <= 1 ? o : 2 - o;
                l = (t + n) / 2;
                s = t === 0 ? 2 * a / (o + a) : 2 * n / (t + n);
                return [
                    e,
                    s * 100,
                    l * 100
                ];
            };
            s.hsv.rgb = function(r) {
                var e = r[0] / 60;
                var n = r[1] / 100;
                var t = r[2] / 100;
                var a = Math.floor(e) % 6;
                var o = e - Math.floor(e);
                var s = 255 * t * (1 - n);
                var l = 255 * t * (1 - n * o);
                var i = 255 * t * (1 - n * (1 - o));
                t *= 255;
                switch(a){
                    case 0:
                        return [
                            t,
                            i,
                            s
                        ];
                    case 1:
                        return [
                            l,
                            t,
                            s
                        ];
                    case 2:
                        return [
                            s,
                            t,
                            i
                        ];
                    case 3:
                        return [
                            s,
                            l,
                            t
                        ];
                    case 4:
                        return [
                            i,
                            s,
                            t
                        ];
                    case 5:
                        return [
                            t,
                            s,
                            l
                        ];
                }
            };
            s.hsv.hsl = function(r) {
                var e = r[0];
                var n = r[1] / 100;
                var t = r[2] / 100;
                var a = Math.max(t, .01);
                var o;
                var s;
                var l;
                l = (2 - n) * t;
                o = (2 - n) * a;
                s = n * a;
                s /= o <= 1 ? o : 2 - o;
                s = s || 0;
                l /= 2;
                return [
                    e,
                    s * 100,
                    l * 100
                ];
            };
            s.hwb.rgb = function(r) {
                var e = r[0] / 360;
                var n = r[1] / 100;
                var t = r[2] / 100;
                var a = n + t;
                var o;
                var s;
                var l;
                var i;
                if (a > 1) {
                    n /= a;
                    t /= a;
                }
                o = Math.floor(6 * e);
                s = 1 - t;
                l = 6 * e - o;
                if ((o & 1) !== 0) {
                    l = 1 - l;
                }
                i = n + l * (s - n);
                var c;
                var u;
                var v;
                switch(o){
                    default:
                    case 6:
                    case 0:
                        c = s;
                        u = i;
                        v = n;
                        break;
                    case 1:
                        c = i;
                        u = s;
                        v = n;
                        break;
                    case 2:
                        c = n;
                        u = s;
                        v = i;
                        break;
                    case 3:
                        c = n;
                        u = i;
                        v = s;
                        break;
                    case 4:
                        c = i;
                        u = n;
                        v = s;
                        break;
                    case 5:
                        c = s;
                        u = n;
                        v = i;
                        break;
                }
                return [
                    c * 255,
                    u * 255,
                    v * 255
                ];
            };
            s.cmyk.rgb = function(r) {
                var e = r[0] / 100;
                var n = r[1] / 100;
                var t = r[2] / 100;
                var a = r[3] / 100;
                var o;
                var s;
                var l;
                o = 1 - Math.min(1, e * (1 - a) + a);
                s = 1 - Math.min(1, n * (1 - a) + a);
                l = 1 - Math.min(1, t * (1 - a) + a);
                return [
                    o * 255,
                    s * 255,
                    l * 255
                ];
            };
            s.xyz.rgb = function(r) {
                var e = r[0] / 100;
                var n = r[1] / 100;
                var t = r[2] / 100;
                var a;
                var o;
                var s;
                a = e * 3.2406 + n * -1.5372 + t * -.4986;
                o = e * -.9689 + n * 1.8758 + t * .0415;
                s = e * .0557 + n * -.204 + t * 1.057;
                a = a > .0031308 ? 1.055 * Math.pow(a, 1 / 2.4) - .055 : a * 12.92;
                o = o > .0031308 ? 1.055 * Math.pow(o, 1 / 2.4) - .055 : o * 12.92;
                s = s > .0031308 ? 1.055 * Math.pow(s, 1 / 2.4) - .055 : s * 12.92;
                a = Math.min(Math.max(0, a), 1);
                o = Math.min(Math.max(0, o), 1);
                s = Math.min(Math.max(0, s), 1);
                return [
                    a * 255,
                    o * 255,
                    s * 255
                ];
            };
            s.xyz.lab = function(r) {
                var e = r[0];
                var n = r[1];
                var t = r[2];
                var a;
                var o;
                var s;
                e /= 95.047;
                n /= 100;
                t /= 108.883;
                e = e > .008856 ? Math.pow(e, 1 / 3) : 7.787 * e + 16 / 116;
                n = n > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116;
                t = t > .008856 ? Math.pow(t, 1 / 3) : 7.787 * t + 16 / 116;
                a = 116 * n - 16;
                o = 500 * (e - n);
                s = 200 * (n - t);
                return [
                    a,
                    o,
                    s
                ];
            };
            s.lab.xyz = function(r) {
                var e = r[0];
                var n = r[1];
                var t = r[2];
                var a;
                var o;
                var s;
                o = (e + 16) / 116;
                a = n / 500 + o;
                s = o - t / 200;
                var l = Math.pow(o, 3);
                var i = Math.pow(a, 3);
                var c = Math.pow(s, 3);
                o = l > .008856 ? l : (o - 16 / 116) / 7.787;
                a = i > .008856 ? i : (a - 16 / 116) / 7.787;
                s = c > .008856 ? c : (s - 16 / 116) / 7.787;
                a *= 95.047;
                o *= 100;
                s *= 108.883;
                return [
                    a,
                    o,
                    s
                ];
            };
            s.lab.lch = function(r) {
                var e = r[0];
                var n = r[1];
                var t = r[2];
                var a;
                var o;
                var s;
                a = Math.atan2(t, n);
                o = a * 360 / 2 / Math.PI;
                if (o < 0) {
                    o += 360;
                }
                s = Math.sqrt(n * n + t * t);
                return [
                    e,
                    s,
                    o
                ];
            };
            s.lch.lab = function(r) {
                var e = r[0];
                var n = r[1];
                var t = r[2];
                var a;
                var o;
                var s;
                s = t / 360 * 2 * Math.PI;
                a = n * Math.cos(s);
                o = n * Math.sin(s);
                return [
                    e,
                    a,
                    o
                ];
            };
            s.rgb.ansi16 = function(r) {
                var e = r[0];
                var n = r[1];
                var t = r[2];
                var a = 1 in arguments ? arguments[1] : s.rgb.hsv(r)[2];
                a = Math.round(a / 50);
                if (a === 0) {
                    return 30;
                }
                var o = 30 + (Math.round(t / 255) << 2 | Math.round(n / 255) << 1 | Math.round(e / 255));
                if (a === 2) {
                    o += 60;
                }
                return o;
            };
            s.hsv.ansi16 = function(r) {
                return s.rgb.ansi16(s.hsv.rgb(r), r[2]);
            };
            s.rgb.ansi256 = function(r) {
                var e = r[0];
                var n = r[1];
                var t = r[2];
                if (e === n && n === t) {
                    if (e < 8) {
                        return 16;
                    }
                    if (e > 248) {
                        return 231;
                    }
                    return Math.round((e - 8) / 247 * 24) + 232;
                }
                var a = 16 + 36 * Math.round(e / 255 * 5) + 6 * Math.round(n / 255 * 5) + Math.round(t / 255 * 5);
                return a;
            };
            s.ansi16.rgb = function(r) {
                var e = r % 10;
                if (e === 0 || e === 7) {
                    if (r > 50) {
                        e += 3.5;
                    }
                    e = e / 10.5 * 255;
                    return [
                        e,
                        e,
                        e
                    ];
                }
                var n = (~~(r > 50) + 1) * .5;
                var t = (e & 1) * n * 255;
                var a = (e >> 1 & 1) * n * 255;
                var o = (e >> 2 & 1) * n * 255;
                return [
                    t,
                    a,
                    o
                ];
            };
            s.ansi256.rgb = function(r) {
                if (r >= 232) {
                    var e = (r - 232) * 10 + 8;
                    return [
                        e,
                        e,
                        e
                    ];
                }
                r -= 16;
                var n;
                var t = Math.floor(r / 36) / 5 * 255;
                var a = Math.floor((n = r % 36) / 6) / 5 * 255;
                var o = n % 6 / 5 * 255;
                return [
                    t,
                    a,
                    o
                ];
            };
            s.rgb.hex = function(r) {
                var e = ((Math.round(r[0]) & 255) << 16) + ((Math.round(r[1]) & 255) << 8) + (Math.round(r[2]) & 255);
                var n = e.toString(16).toUpperCase();
                return "000000".substring(n.length) + n;
            };
            s.hex.rgb = function(r) {
                var e = r.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
                if (!e) {
                    return [
                        0,
                        0,
                        0
                    ];
                }
                var n = e[0];
                if (e[0].length === 3) {
                    n = n.split("").map(function(r) {
                        return r + r;
                    }).join("");
                }
                var t = parseInt(n, 16);
                var a = t >> 16 & 255;
                var o = t >> 8 & 255;
                var s = t & 255;
                return [
                    a,
                    o,
                    s
                ];
            };
            s.rgb.hcg = function(r) {
                var e = r[0] / 255;
                var n = r[1] / 255;
                var t = r[2] / 255;
                var a = Math.max(Math.max(e, n), t);
                var o = Math.min(Math.min(e, n), t);
                var s = a - o;
                var l;
                var i;
                if (s < 1) {
                    l = o / (1 - s);
                } else {
                    l = 0;
                }
                if (s <= 0) {
                    i = 0;
                } else if (a === e) {
                    i = (n - t) / s % 6;
                } else if (a === n) {
                    i = 2 + (t - e) / s;
                } else {
                    i = 4 + (e - n) / s + 4;
                }
                i /= 6;
                i %= 1;
                return [
                    i * 360,
                    s * 100,
                    l * 100
                ];
            };
            s.hsl.hcg = function(r) {
                var e = r[1] / 100;
                var n = r[2] / 100;
                var t = 1;
                var a = 0;
                if (n < .5) {
                    t = 2 * e * n;
                } else {
                    t = 2 * e * (1 - n);
                }
                if (t < 1) {
                    a = (n - .5 * t) / (1 - t);
                }
                return [
                    r[0],
                    t * 100,
                    a * 100
                ];
            };
            s.hsv.hcg = function(r) {
                var e = r[1] / 100;
                var n = r[2] / 100;
                var t = e * n;
                var a = 0;
                if (t < 1) {
                    a = (n - t) / (1 - t);
                }
                return [
                    r[0],
                    t * 100,
                    a * 100
                ];
            };
            s.hcg.rgb = function(r) {
                var e = r[0] / 360;
                var n = r[1] / 100;
                var t = r[2] / 100;
                if (n === 0) {
                    return [
                        t * 255,
                        t * 255,
                        t * 255
                    ];
                }
                var a = [
                    0,
                    0,
                    0
                ];
                var o = e % 1 * 6;
                var s = o % 1;
                var l = 1 - s;
                var i = 0;
                switch(Math.floor(o)){
                    case 0:
                        a[0] = 1;
                        a[1] = s;
                        a[2] = 0;
                        break;
                    case 1:
                        a[0] = l;
                        a[1] = 1;
                        a[2] = 0;
                        break;
                    case 2:
                        a[0] = 0;
                        a[1] = 1;
                        a[2] = s;
                        break;
                    case 3:
                        a[0] = 0;
                        a[1] = l;
                        a[2] = 1;
                        break;
                    case 4:
                        a[0] = s;
                        a[1] = 0;
                        a[2] = 1;
                        break;
                    default:
                        a[0] = 1;
                        a[1] = 0;
                        a[2] = l;
                }
                i = (1 - n) * t;
                return [
                    (n * a[0] + i) * 255,
                    (n * a[1] + i) * 255,
                    (n * a[2] + i) * 255
                ];
            };
            s.hcg.hsv = function(r) {
                var e = r[1] / 100;
                var n = r[2] / 100;
                var t = e + n * (1 - e);
                var a = 0;
                if (t > 0) {
                    a = e / t;
                }
                return [
                    r[0],
                    a * 100,
                    t * 100
                ];
            };
            s.hcg.hsl = function(r) {
                var e = r[1] / 100;
                var n = r[2] / 100;
                var t = n * (1 - e) + .5 * e;
                var a = 0;
                if (t > 0 && t < .5) {
                    a = e / (2 * t);
                } else if (t >= .5 && t < 1) {
                    a = e / (2 * (1 - t));
                }
                return [
                    r[0],
                    a * 100,
                    t * 100
                ];
            };
            s.hcg.hwb = function(r) {
                var e = r[1] / 100;
                var n = r[2] / 100;
                var t = e + n * (1 - e);
                return [
                    r[0],
                    (t - e) * 100,
                    (1 - t) * 100
                ];
            };
            s.hwb.hcg = function(r) {
                var e = r[1] / 100;
                var n = r[2] / 100;
                var t = 1 - n;
                var a = t - e;
                var o = 0;
                if (a < 1) {
                    o = (t - a) / (1 - a);
                }
                return [
                    r[0],
                    a * 100,
                    o * 100
                ];
            };
            s.apple.rgb = function(r) {
                return [
                    r[0] / 65535 * 255,
                    r[1] / 65535 * 255,
                    r[2] / 65535 * 255
                ];
            };
            s.rgb.apple = function(r) {
                return [
                    r[0] / 255 * 65535,
                    r[1] / 255 * 65535,
                    r[2] / 255 * 65535
                ];
            };
            s.gray.rgb = function(r) {
                return [
                    r[0] / 100 * 255,
                    r[0] / 100 * 255,
                    r[0] / 100 * 255
                ];
            };
            s.gray.hsl = s.gray.hsv = function(r) {
                return [
                    0,
                    0,
                    r[0]
                ];
            };
            s.gray.hwb = function(r) {
                return [
                    0,
                    100,
                    r[0]
                ];
            };
            s.gray.cmyk = function(r) {
                return [
                    0,
                    0,
                    0,
                    r[0]
                ];
            };
            s.gray.lab = function(r) {
                return [
                    r[0],
                    0,
                    0
                ];
            };
            s.gray.hex = function(r) {
                var e = Math.round(r[0] / 100 * 255) & 255;
                var n = (e << 16) + (e << 8) + e;
                var t = n.toString(16).toUpperCase();
                return "000000".substring(t.length) + t;
            };
            s.rgb.gray = function(r) {
                var e = (r[0] + r[1] + r[2]) / 3;
                return [
                    e / 255 * 100
                ];
            };
        },
        54: (r, e, n)=>{
            var t = n(117);
            var a = n(528);
            var o = {};
            var s = Object.keys(t);
            function wrapRaw(r) {
                var wrappedFn = function(e) {
                    if (e === undefined || e === null) {
                        return e;
                    }
                    if (arguments.length > 1) {
                        e = Array.prototype.slice.call(arguments);
                    }
                    return r(e);
                };
                if ("conversion" in r) {
                    wrappedFn.conversion = r.conversion;
                }
                return wrappedFn;
            }
            function wrapRounded(r) {
                var wrappedFn = function(e) {
                    if (e === undefined || e === null) {
                        return e;
                    }
                    if (arguments.length > 1) {
                        e = Array.prototype.slice.call(arguments);
                    }
                    var n = r(e);
                    if (typeof n === "object") {
                        for(var t = n.length, a = 0; a < t; a++){
                            n[a] = Math.round(n[a]);
                        }
                    }
                    return n;
                };
                if ("conversion" in r) {
                    wrappedFn.conversion = r.conversion;
                }
                return wrappedFn;
            }
            s.forEach(function(r) {
                o[r] = {};
                Object.defineProperty(o[r], "channels", {
                    value: t[r].channels
                });
                Object.defineProperty(o[r], "labels", {
                    value: t[r].labels
                });
                var e = a(r);
                var n = Object.keys(e);
                n.forEach(function(n) {
                    var t = e[n];
                    o[r][n] = wrapRounded(t);
                    o[r][n].raw = wrapRaw(t);
                });
            });
            r.exports = o;
        },
        528: (r, e, n)=>{
            var t = n(117);
            function buildGraph() {
                var r = {};
                var e = Object.keys(t);
                for(var n = e.length, a = 0; a < n; a++){
                    r[e[a]] = {
                        distance: -1,
                        parent: null
                    };
                }
                return r;
            }
            function deriveBFS(r) {
                var e = buildGraph();
                var n = [
                    r
                ];
                e[r].distance = 0;
                while(n.length){
                    var a = n.pop();
                    var o = Object.keys(t[a]);
                    for(var s = o.length, l = 0; l < s; l++){
                        var i = o[l];
                        var c = e[i];
                        if (c.distance === -1) {
                            c.distance = e[a].distance + 1;
                            c.parent = a;
                            n.unshift(i);
                        }
                    }
                }
                return e;
            }
            function link(r, e) {
                return function(n) {
                    return e(r(n));
                };
            }
            function wrapConversion(r, e) {
                var n = [
                    e[r].parent,
                    r
                ];
                var a = t[e[r].parent][r];
                var o = e[r].parent;
                while(e[o].parent){
                    n.unshift(e[o].parent);
                    a = link(t[e[o].parent][o], a);
                    o = e[o].parent;
                }
                a.conversion = n;
                return a;
            }
            r.exports = function(r) {
                var e = deriveBFS(r);
                var n = {};
                var t = Object.keys(e);
                for(var a = t.length, o = 0; o < a; o++){
                    var s = t[o];
                    var l = e[s];
                    if (l.parent === null) {
                        continue;
                    }
                    n[s] = wrapConversion(s, e);
                }
                return n;
            };
        },
        251: (r)=>{
            "use strict";
            r.exports = {
                aliceblue: [
                    240,
                    248,
                    255
                ],
                antiquewhite: [
                    250,
                    235,
                    215
                ],
                aqua: [
                    0,
                    255,
                    255
                ],
                aquamarine: [
                    127,
                    255,
                    212
                ],
                azure: [
                    240,
                    255,
                    255
                ],
                beige: [
                    245,
                    245,
                    220
                ],
                bisque: [
                    255,
                    228,
                    196
                ],
                black: [
                    0,
                    0,
                    0
                ],
                blanchedalmond: [
                    255,
                    235,
                    205
                ],
                blue: [
                    0,
                    0,
                    255
                ],
                blueviolet: [
                    138,
                    43,
                    226
                ],
                brown: [
                    165,
                    42,
                    42
                ],
                burlywood: [
                    222,
                    184,
                    135
                ],
                cadetblue: [
                    95,
                    158,
                    160
                ],
                chartreuse: [
                    127,
                    255,
                    0
                ],
                chocolate: [
                    210,
                    105,
                    30
                ],
                coral: [
                    255,
                    127,
                    80
                ],
                cornflowerblue: [
                    100,
                    149,
                    237
                ],
                cornsilk: [
                    255,
                    248,
                    220
                ],
                crimson: [
                    220,
                    20,
                    60
                ],
                cyan: [
                    0,
                    255,
                    255
                ],
                darkblue: [
                    0,
                    0,
                    139
                ],
                darkcyan: [
                    0,
                    139,
                    139
                ],
                darkgoldenrod: [
                    184,
                    134,
                    11
                ],
                darkgray: [
                    169,
                    169,
                    169
                ],
                darkgreen: [
                    0,
                    100,
                    0
                ],
                darkgrey: [
                    169,
                    169,
                    169
                ],
                darkkhaki: [
                    189,
                    183,
                    107
                ],
                darkmagenta: [
                    139,
                    0,
                    139
                ],
                darkolivegreen: [
                    85,
                    107,
                    47
                ],
                darkorange: [
                    255,
                    140,
                    0
                ],
                darkorchid: [
                    153,
                    50,
                    204
                ],
                darkred: [
                    139,
                    0,
                    0
                ],
                darksalmon: [
                    233,
                    150,
                    122
                ],
                darkseagreen: [
                    143,
                    188,
                    143
                ],
                darkslateblue: [
                    72,
                    61,
                    139
                ],
                darkslategray: [
                    47,
                    79,
                    79
                ],
                darkslategrey: [
                    47,
                    79,
                    79
                ],
                darkturquoise: [
                    0,
                    206,
                    209
                ],
                darkviolet: [
                    148,
                    0,
                    211
                ],
                deeppink: [
                    255,
                    20,
                    147
                ],
                deepskyblue: [
                    0,
                    191,
                    255
                ],
                dimgray: [
                    105,
                    105,
                    105
                ],
                dimgrey: [
                    105,
                    105,
                    105
                ],
                dodgerblue: [
                    30,
                    144,
                    255
                ],
                firebrick: [
                    178,
                    34,
                    34
                ],
                floralwhite: [
                    255,
                    250,
                    240
                ],
                forestgreen: [
                    34,
                    139,
                    34
                ],
                fuchsia: [
                    255,
                    0,
                    255
                ],
                gainsboro: [
                    220,
                    220,
                    220
                ],
                ghostwhite: [
                    248,
                    248,
                    255
                ],
                gold: [
                    255,
                    215,
                    0
                ],
                goldenrod: [
                    218,
                    165,
                    32
                ],
                gray: [
                    128,
                    128,
                    128
                ],
                green: [
                    0,
                    128,
                    0
                ],
                greenyellow: [
                    173,
                    255,
                    47
                ],
                grey: [
                    128,
                    128,
                    128
                ],
                honeydew: [
                    240,
                    255,
                    240
                ],
                hotpink: [
                    255,
                    105,
                    180
                ],
                indianred: [
                    205,
                    92,
                    92
                ],
                indigo: [
                    75,
                    0,
                    130
                ],
                ivory: [
                    255,
                    255,
                    240
                ],
                khaki: [
                    240,
                    230,
                    140
                ],
                lavender: [
                    230,
                    230,
                    250
                ],
                lavenderblush: [
                    255,
                    240,
                    245
                ],
                lawngreen: [
                    124,
                    252,
                    0
                ],
                lemonchiffon: [
                    255,
                    250,
                    205
                ],
                lightblue: [
                    173,
                    216,
                    230
                ],
                lightcoral: [
                    240,
                    128,
                    128
                ],
                lightcyan: [
                    224,
                    255,
                    255
                ],
                lightgoldenrodyellow: [
                    250,
                    250,
                    210
                ],
                lightgray: [
                    211,
                    211,
                    211
                ],
                lightgreen: [
                    144,
                    238,
                    144
                ],
                lightgrey: [
                    211,
                    211,
                    211
                ],
                lightpink: [
                    255,
                    182,
                    193
                ],
                lightsalmon: [
                    255,
                    160,
                    122
                ],
                lightseagreen: [
                    32,
                    178,
                    170
                ],
                lightskyblue: [
                    135,
                    206,
                    250
                ],
                lightslategray: [
                    119,
                    136,
                    153
                ],
                lightslategrey: [
                    119,
                    136,
                    153
                ],
                lightsteelblue: [
                    176,
                    196,
                    222
                ],
                lightyellow: [
                    255,
                    255,
                    224
                ],
                lime: [
                    0,
                    255,
                    0
                ],
                limegreen: [
                    50,
                    205,
                    50
                ],
                linen: [
                    250,
                    240,
                    230
                ],
                magenta: [
                    255,
                    0,
                    255
                ],
                maroon: [
                    128,
                    0,
                    0
                ],
                mediumaquamarine: [
                    102,
                    205,
                    170
                ],
                mediumblue: [
                    0,
                    0,
                    205
                ],
                mediumorchid: [
                    186,
                    85,
                    211
                ],
                mediumpurple: [
                    147,
                    112,
                    219
                ],
                mediumseagreen: [
                    60,
                    179,
                    113
                ],
                mediumslateblue: [
                    123,
                    104,
                    238
                ],
                mediumspringgreen: [
                    0,
                    250,
                    154
                ],
                mediumturquoise: [
                    72,
                    209,
                    204
                ],
                mediumvioletred: [
                    199,
                    21,
                    133
                ],
                midnightblue: [
                    25,
                    25,
                    112
                ],
                mintcream: [
                    245,
                    255,
                    250
                ],
                mistyrose: [
                    255,
                    228,
                    225
                ],
                moccasin: [
                    255,
                    228,
                    181
                ],
                navajowhite: [
                    255,
                    222,
                    173
                ],
                navy: [
                    0,
                    0,
                    128
                ],
                oldlace: [
                    253,
                    245,
                    230
                ],
                olive: [
                    128,
                    128,
                    0
                ],
                olivedrab: [
                    107,
                    142,
                    35
                ],
                orange: [
                    255,
                    165,
                    0
                ],
                orangered: [
                    255,
                    69,
                    0
                ],
                orchid: [
                    218,
                    112,
                    214
                ],
                palegoldenrod: [
                    238,
                    232,
                    170
                ],
                palegreen: [
                    152,
                    251,
                    152
                ],
                paleturquoise: [
                    175,
                    238,
                    238
                ],
                palevioletred: [
                    219,
                    112,
                    147
                ],
                papayawhip: [
                    255,
                    239,
                    213
                ],
                peachpuff: [
                    255,
                    218,
                    185
                ],
                peru: [
                    205,
                    133,
                    63
                ],
                pink: [
                    255,
                    192,
                    203
                ],
                plum: [
                    221,
                    160,
                    221
                ],
                powderblue: [
                    176,
                    224,
                    230
                ],
                purple: [
                    128,
                    0,
                    128
                ],
                rebeccapurple: [
                    102,
                    51,
                    153
                ],
                red: [
                    255,
                    0,
                    0
                ],
                rosybrown: [
                    188,
                    143,
                    143
                ],
                royalblue: [
                    65,
                    105,
                    225
                ],
                saddlebrown: [
                    139,
                    69,
                    19
                ],
                salmon: [
                    250,
                    128,
                    114
                ],
                sandybrown: [
                    244,
                    164,
                    96
                ],
                seagreen: [
                    46,
                    139,
                    87
                ],
                seashell: [
                    255,
                    245,
                    238
                ],
                sienna: [
                    160,
                    82,
                    45
                ],
                silver: [
                    192,
                    192,
                    192
                ],
                skyblue: [
                    135,
                    206,
                    235
                ],
                slateblue: [
                    106,
                    90,
                    205
                ],
                slategray: [
                    112,
                    128,
                    144
                ],
                slategrey: [
                    112,
                    128,
                    144
                ],
                snow: [
                    255,
                    250,
                    250
                ],
                springgreen: [
                    0,
                    255,
                    127
                ],
                steelblue: [
                    70,
                    130,
                    180
                ],
                tan: [
                    210,
                    180,
                    140
                ],
                teal: [
                    0,
                    128,
                    128
                ],
                thistle: [
                    216,
                    191,
                    216
                ],
                tomato: [
                    255,
                    99,
                    71
                ],
                turquoise: [
                    64,
                    224,
                    208
                ],
                violet: [
                    238,
                    130,
                    238
                ],
                wheat: [
                    245,
                    222,
                    179
                ],
                white: [
                    255,
                    255,
                    255
                ],
                whitesmoke: [
                    245,
                    245,
                    245
                ],
                yellow: [
                    255,
                    255,
                    0
                ],
                yellowgreen: [
                    154,
                    205,
                    50
                ]
            };
        },
        379: (r)=>{
            "use strict";
            var e = /[|\\{}()[\]^$+*?.]/g;
            r.exports = function(r) {
                if (typeof r !== "string") {
                    throw new TypeError("Expected a string");
                }
                return r.replace(e, "\\$&");
            };
        },
        343: (r)=>{
            "use strict";
            r.exports = (r, e)=>{
                e = e || process.argv;
                const n = r.startsWith("-") ? "" : r.length === 1 ? "-" : "--";
                const t = e.indexOf(n + r);
                const a = e.indexOf("--");
                return t !== -1 && (a === -1 ? true : t < a);
            };
        },
        220: (r, e, n)=>{
            "use strict";
            const t = n(37);
            const a = n(343);
            const o = process.env;
            let s;
            if (a("no-color") || a("no-colors") || a("color=false")) {
                s = false;
            } else if (a("color") || a("colors") || a("color=true") || a("color=always")) {
                s = true;
            }
            if ("FORCE_COLOR" in o) {
                s = o.FORCE_COLOR.length === 0 || parseInt(o.FORCE_COLOR, 10) !== 0;
            }
            function translateLevel(r) {
                if (r === 0) {
                    return false;
                }
                return {
                    level: r,
                    hasBasic: true,
                    has256: r >= 2,
                    has16m: r >= 3
                };
            }
            function supportsColor(r) {
                if (s === false) {
                    return 0;
                }
                if (a("color=16m") || a("color=full") || a("color=truecolor")) {
                    return 3;
                }
                if (a("color=256")) {
                    return 2;
                }
                if (r && !r.isTTY && s !== true) {
                    return 0;
                }
                const e = s ? 1 : 0;
                if (process.platform === "win32") {
                    const r = t.release().split(".");
                    if (Number(process.versions.node.split(".")[0]) >= 8 && Number(r[0]) >= 10 && Number(r[2]) >= 10586) {
                        return Number(r[2]) >= 14931 ? 3 : 2;
                    }
                    return 1;
                }
                if ("CI" in o) {
                    if ([
                        "TRAVIS",
                        "CIRCLECI",
                        "APPVEYOR",
                        "GITLAB_CI"
                    ].some((r)=>r in o) || o.CI_NAME === "codeship") {
                        return 1;
                    }
                    return e;
                }
                if ("TEAMCITY_VERSION" in o) {
                    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(o.TEAMCITY_VERSION) ? 1 : 0;
                }
                if (o.COLORTERM === "truecolor") {
                    return 3;
                }
                if ("TERM_PROGRAM" in o) {
                    const r = parseInt((o.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
                    switch(o.TERM_PROGRAM){
                        case "iTerm.app":
                            return r >= 3 ? 3 : 2;
                        case "Apple_Terminal":
                            return 2;
                    }
                }
                if (/-256(color)?$/i.test(o.TERM)) {
                    return 2;
                }
                if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(o.TERM)) {
                    return 1;
                }
                if ("COLORTERM" in o) {
                    return 1;
                }
                if (o.TERM === "dumb") {
                    return e;
                }
                return e;
            }
            function getSupportLevel(r) {
                const e = supportsColor(r);
                return translateLevel(e);
            }
            r.exports = {
                supportsColor: getSupportLevel,
                stdout: getSupportLevel(process.stdout),
                stderr: getSupportLevel(process.stderr)
            };
        },
        37: (r)=>{
            "use strict";
            r.exports = __webpack_require__(2037);
        }
    };
    var e = {};
    function __nccwpck_require__(n) {
        var t = e[n];
        if (t !== undefined) {
            return t.exports;
        }
        var a = e[n] = {
            id: n,
            loaded: false,
            exports: {}
        };
        var o = true;
        try {
            r[n](a, a.exports, __nccwpck_require__);
            o = false;
        } finally{
            if (o) delete e[n];
        }
        a.loaded = true;
        return a.exports;
    }
    (()=>{
        __nccwpck_require__.nmd = (r)=>{
            r.paths = [];
            if (!r.children) r.children = [];
            return r;
        };
    })();
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
    var n = __nccwpck_require__(148);
    module.exports = n;
})();


/***/ }),

/***/ 8852:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return _default;
    }
}));
let chalk;
if (false) {} else {
    chalk = __webpack_require__(6777);
}
const _default = chalk; //# sourceMappingURL=chalk.js.map


/***/ }),

/***/ 1275:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getCookieParser: function() {
        return getCookieParser;
    },
    sendStatusCode: function() {
        return sendStatusCode;
    },
    redirect: function() {
        return redirect;
    },
    checkIsOnDemandRevalidate: function() {
        return checkIsOnDemandRevalidate;
    },
    COOKIE_NAME_PRERENDER_BYPASS: function() {
        return COOKIE_NAME_PRERENDER_BYPASS;
    },
    COOKIE_NAME_PRERENDER_DATA: function() {
        return COOKIE_NAME_PRERENDER_DATA;
    },
    RESPONSE_LIMIT_DEFAULT: function() {
        return RESPONSE_LIMIT_DEFAULT;
    },
    SYMBOL_PREVIEW_DATA: function() {
        return SYMBOL_PREVIEW_DATA;
    },
    SYMBOL_CLEARED_COOKIES: function() {
        return SYMBOL_CLEARED_COOKIES;
    },
    clearPreviewData: function() {
        return clearPreviewData;
    },
    ApiError: function() {
        return ApiError;
    },
    sendError: function() {
        return sendError;
    },
    setLazyProp: function() {
        return setLazyProp;
    }
});
const _headers = __webpack_require__(2022);
const _constants = __webpack_require__(6824);
function getCookieParser(headers) {
    return function parseCookie() {
        const { cookie } = headers;
        if (!cookie) {
            return {};
        }
        const { parse: parseCookieFn } = __webpack_require__(984);
        return parseCookieFn(Array.isArray(cookie) ? cookie.join("; ") : cookie);
    };
}
function sendStatusCode(res, statusCode) {
    res.statusCode = statusCode;
    return res;
}
function redirect(res, statusOrUrl, url) {
    if (typeof statusOrUrl === "string") {
        url = statusOrUrl;
        statusOrUrl = 307;
    }
    if (typeof statusOrUrl !== "number" || typeof url !== "string") {
        throw new Error(`Invalid redirect arguments. Please use a single argument URL, e.g. res.redirect('/destination') or use a status code and URL, e.g. res.redirect(307, '/destination').`);
    }
    res.writeHead(statusOrUrl, {
        Location: url
    });
    res.write(url);
    res.end();
    return res;
}
function checkIsOnDemandRevalidate(req, previewProps) {
    const headers = _headers.HeadersAdapter.from(req.headers);
    const previewModeId = headers.get(_constants.PRERENDER_REVALIDATE_HEADER);
    const isOnDemandRevalidate = previewModeId === previewProps.previewModeId;
    const revalidateOnlyGenerated = headers.has(_constants.PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER);
    return {
        isOnDemandRevalidate,
        revalidateOnlyGenerated
    };
}
const COOKIE_NAME_PRERENDER_BYPASS = `__prerender_bypass`;
const COOKIE_NAME_PRERENDER_DATA = `__next_preview_data`;
const RESPONSE_LIMIT_DEFAULT = 4 * 1024 * 1024;
const SYMBOL_PREVIEW_DATA = Symbol(COOKIE_NAME_PRERENDER_DATA);
const SYMBOL_CLEARED_COOKIES = Symbol(COOKIE_NAME_PRERENDER_BYPASS);
function clearPreviewData(res, options = {}) {
    if (SYMBOL_CLEARED_COOKIES in res) {
        return res;
    }
    const { serialize } = __webpack_require__(984);
    const previous = res.getHeader("Set-Cookie");
    res.setHeader(`Set-Cookie`, [
        ...typeof previous === "string" ? [
            previous
        ] : Array.isArray(previous) ? previous : [],
        serialize(COOKIE_NAME_PRERENDER_BYPASS, "", {
            // To delete a cookie, set `expires` to a date in the past:
            // https://tools.ietf.org/html/rfc6265#section-4.1.1
            // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
            expires: new Date(0),
            httpOnly: true,
            sameSite:  true ? "none" : 0,
            secure: "production" !== "development",
            path: "/",
            ...options.path !== undefined ? {
                path: options.path
            } : undefined
        }),
        serialize(COOKIE_NAME_PRERENDER_DATA, "", {
            // To delete a cookie, set `expires` to a date in the past:
            // https://tools.ietf.org/html/rfc6265#section-4.1.1
            // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
            expires: new Date(0),
            httpOnly: true,
            sameSite:  true ? "none" : 0,
            secure: "production" !== "development",
            path: "/",
            ...options.path !== undefined ? {
                path: options.path
            } : undefined
        })
    ]);
    Object.defineProperty(res, SYMBOL_CLEARED_COOKIES, {
        value: true,
        enumerable: false
    });
    return res;
}
class ApiError extends Error {
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode;
    }
}
function sendError(res, statusCode, message) {
    res.statusCode = statusCode;
    res.statusMessage = message;
    res.end(message);
}
function setLazyProp({ req }, prop, getter) {
    const opts = {
        configurable: true,
        enumerable: true
    };
    const optsReset = {
        ...opts,
        writable: true
    };
    Object.defineProperty(req, prop, {
        ...opts,
        get: ()=>{
            const value = getter();
            // we set the property on the object to avoid recalculating it
            Object.defineProperty(req, prop, {
                ...optsReset,
                value
            });
            return value;
        },
        set: (value)=>{
            Object.defineProperty(req, prop, {
                ...optsReset,
                value
            });
        }
    });
} //# sourceMappingURL=index.js.map


/***/ }),

/***/ 6493:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "DraftModeProvider", ({
    enumerable: true,
    get: function() {
        return DraftModeProvider;
    }
}));
const _apiutils = __webpack_require__(1275);
class DraftModeProvider {
    constructor(previewProps, req, cookies, mutableCookies){
        var _cookies_get;
        // The logic for draftMode() is very similar to tryGetPreviewData()
        // but Draft Mode does not have any data associated with it.
        const isOnDemandRevalidate = previewProps && (0, _apiutils.checkIsOnDemandRevalidate)(req, previewProps).isOnDemandRevalidate;
        const cookieValue = (_cookies_get = cookies.get(_apiutils.COOKIE_NAME_PRERENDER_BYPASS)) == null ? void 0 : _cookies_get.value;
        this.isEnabled = Boolean(!isOnDemandRevalidate && cookieValue && previewProps && cookieValue === previewProps.previewModeId);
        this._previewModeId = previewProps == null ? void 0 : previewProps.previewModeId;
        this._mutableCookies = mutableCookies;
    }
    enable() {
        if (!this._previewModeId) {
            throw new Error("Invariant: previewProps missing previewModeId this should never happen");
        }
        this._mutableCookies.set({
            name: _apiutils.COOKIE_NAME_PRERENDER_BYPASS,
            value: this._previewModeId,
            httpOnly: true,
            sameSite:  true ? "none" : 0,
            secure: "production" !== "development",
            path: "/"
        });
    }
    disable() {
        // To delete a cookie, set `expires` to a date in the past:
        // https://tools.ietf.org/html/rfc6265#section-4.1.1
        // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
        this._mutableCookies.set({
            name: _apiutils.COOKIE_NAME_PRERENDER_BYPASS,
            value: "",
            httpOnly: true,
            sameSite:  true ? "none" : 0,
            secure: "production" !== "development",
            path: "/",
            expires: new Date(0)
        });
    }
} //# sourceMappingURL=draft-mode-provider.js.map


/***/ }),

/***/ 6806:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "RequestAsyncStorageWrapper", ({
    enumerable: true,
    get: function() {
        return RequestAsyncStorageWrapper;
    }
}));
const _approuterheaders = __webpack_require__(2497);
const _headers = __webpack_require__(2022);
const _requestcookies = __webpack_require__(4277);
const _cookies = __webpack_require__(2634);
const _draftmodeprovider = __webpack_require__(6493);
function getHeaders(headers) {
    const cleaned = _headers.HeadersAdapter.from(headers);
    for (const param of _approuterheaders.FLIGHT_PARAMETERS){
        cleaned.delete(param.toString().toLowerCase());
    }
    return _headers.HeadersAdapter.seal(cleaned);
}
function getCookies(headers) {
    const cookies = new _cookies.RequestCookies(_headers.HeadersAdapter.from(headers));
    return _requestcookies.RequestCookiesAdapter.seal(cookies);
}
function getMutableCookies(headers, res) {
    const cookies = new _cookies.RequestCookies(_headers.HeadersAdapter.from(headers));
    return _requestcookies.MutableRequestCookiesAdapter.wrap(cookies, res);
}
const RequestAsyncStorageWrapper = {
    /**
   * Wrap the callback with the given store so it can access the underlying
   * store using hooks.
   *
   * @param storage underlying storage object returned by the module
   * @param context context to seed the store
   * @param callback function to call within the scope of the context
   * @returns the result returned by the callback
   */ wrap (storage, { req, res, renderOpts }, callback) {
        let previewProps = undefined;
        if (renderOpts && "previewProps" in renderOpts) {
            // TODO: investigate why previewProps isn't on RenderOpts
            previewProps = renderOpts.previewProps;
        }
        const cache = {};
        const store = {
            get headers () {
                if (!cache.headers) {
                    // Seal the headers object that'll freeze out any methods that could
                    // mutate the underlying data.
                    cache.headers = getHeaders(req.headers);
                }
                return cache.headers;
            },
            get cookies () {
                if (!cache.cookies) {
                    // Seal the cookies object that'll freeze out any methods that could
                    // mutate the underlying data.
                    cache.cookies = getCookies(req.headers);
                }
                return cache.cookies;
            },
            get mutableCookies () {
                if (!cache.mutableCookies) {
                    cache.mutableCookies = getMutableCookies(req.headers, res);
                }
                return cache.mutableCookies;
            },
            get draftMode () {
                if (!cache.draftMode) {
                    cache.draftMode = new _draftmodeprovider.DraftModeProvider(previewProps, req, this.cookies, this.mutableCookies);
                }
                return cache.draftMode;
            }
        };
        return storage.run(store, callback, store);
    }
}; //# sourceMappingURL=request-async-storage-wrapper.js.map


/***/ }),

/***/ 6992:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "StaticGenerationAsyncStorageWrapper", ({
    enumerable: true,
    get: function() {
        return StaticGenerationAsyncStorageWrapper;
    }
}));
const StaticGenerationAsyncStorageWrapper = {
    wrap (storage, { pathname, renderOpts }, callback) {
        /**
     * Rules of Static & Dynamic HTML:
     *
     *    1.) We must generate static HTML unless the caller explicitly opts
     *        in to dynamic HTML support.
     *
     *    2.) If dynamic HTML support is requested, we must honor that request
     *        or throw an error. It is the sole responsibility of the caller to
     *        ensure they aren't e.g. requesting dynamic HTML for an AMP page.
     *
     *    3.) If the request is in draft mode, we must generate dynamic HTML.
     *
     * These rules help ensure that other existing features like request caching,
     * coalescing, and ISR continue working as intended.
     */ const isStaticGeneration = !renderOpts.supportsDynamicHTML && !renderOpts.isBot && !renderOpts.isDraftMode;
        const store = {
            isStaticGeneration,
            pathname,
            originalPathname: renderOpts.originalPathname,
            incrementalCache: // so that it can access the fs cache without mocks
            renderOpts.incrementalCache || globalThis.__incrementalCache,
            isRevalidate: renderOpts.isRevalidate,
            isPrerendering: renderOpts.nextExport,
            fetchCache: renderOpts.fetchCache,
            isOnDemandRevalidate: renderOpts.isOnDemandRevalidate,
            isDraftMode: renderOpts.isDraftMode
        };
        // TODO: remove this when we resolve accessing the store outside the execution context
        renderOpts.store = store;
        return storage.run(store, callback, store);
    }
}; //# sourceMappingURL=static-generation-async-storage-wrapper.js.map


/***/ }),

/***/ 8474:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "autoImplementMethods", ({
    enumerable: true,
    get: function() {
        return autoImplementMethods;
    }
}));
const _http = __webpack_require__(1189);
const _responsehandlers = __webpack_require__(1048);
const AUTOMATIC_ROUTE_METHODS = [
    "HEAD",
    "OPTIONS"
];
function autoImplementMethods(handlers) {
    // Loop through all the HTTP methods to create the initial methods object.
    // Each of the methods will be set to the the 405 response handler.
    const methods = _http.HTTP_METHODS.reduce((acc, method)=>({
            ...acc,
            // If the userland module implements the method, then use it. Otherwise,
            // use the 405 response handler.
            [method]: handlers[method] ?? _responsehandlers.handleMethodNotAllowedResponse
        }), {});
    // Get all the methods that could be automatically implemented that were not
    // implemented by the userland module.
    const implemented = new Set(_http.HTTP_METHODS.filter((method)=>handlers[method]));
    const missing = AUTOMATIC_ROUTE_METHODS.filter((method)=>!implemented.has(method));
    // Loop over the missing methods to automatically implement them if we can.
    for (const method of missing){
        // If the userland module doesn't implement the HEAD method, then
        // we'll automatically implement it by calling the GET method (if it
        // exists).
        if (method === "HEAD") {
            // If the userland module doesn't implement the GET method, then
            // we're done.
            if (!handlers.GET) break;
            // Implement the HEAD method by calling the GET method.
            methods.HEAD = handlers.GET;
            // Mark it as implemented.
            implemented.add("HEAD");
            continue;
        }
        // If OPTIONS is not provided then implement it.
        if (method === "OPTIONS") {
            // TODO: check if HEAD is implemented, if so, use it to add more headers
            // Get all the methods that were implemented by the userland module.
            const allow = [
                "OPTIONS",
                ...implemented
            ];
            // If the list of methods doesn't include HEAD, but it includes GET, then
            // add HEAD as it's automatically implemented.
            if (!implemented.has("HEAD") && implemented.has("GET")) {
                allow.push("HEAD");
            }
            // Sort and join the list with commas to create the `Allow` header. See:
            // https://httpwg.org/specs/rfc9110.html#field.allow
            const headers = {
                Allow: allow.sort().join(", ")
            };
            // Implement the OPTIONS method by returning a 204 response with the
            // `Allow` header.
            methods.OPTIONS = ()=>new Response(null, {
                    status: 204,
                    headers
                });
            // Mark this method as implemented.
            implemented.add("OPTIONS");
            continue;
        }
        throw new Error(`Invariant: should handle all automatic implementable methods, got method: ${method}`);
    }
    return methods;
} //# sourceMappingURL=auto-implement-methods.js.map


/***/ }),

/***/ 6512:
/***/ ((__unused_webpack_module, exports) => {

/**
 * Cleans a URL by stripping the protocol, host, and search params.
 *
 * @param urlString the url to clean
 * @returns the cleaned url
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "cleanURL", ({
    enumerable: true,
    get: function() {
        return cleanURL;
    }
}));
function cleanURL(urlString) {
    const url = new URL(urlString);
    url.host = "localhost:3000";
    url.search = "";
    url.protocol = "http";
    return url.toString();
} //# sourceMappingURL=clean-url.js.map


/***/ }),

/***/ 9226:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "getNonStaticMethods", ({
    enumerable: true,
    get: function() {
        return getNonStaticMethods;
    }
}));
const NON_STATIC_METHODS = [
    "OPTIONS",
    "POST",
    "PUT",
    "DELETE",
    "PATCH"
];
function getNonStaticMethods(handlers) {
    // We can currently only statically optimize if only GET/HEAD are used as
    // prerender can't be used conditionally based on the method currently.
    const methods = NON_STATIC_METHODS.filter((method)=>handlers[method]);
    if (methods.length === 0) return false;
    return methods;
} //# sourceMappingURL=get-non-static-methods.js.map


/***/ }),

/***/ 7986:
/***/ ((__unused_webpack_module, exports) => {

/**
 * Get pathname from absolute path.
 *
 * @param absolutePath the absolute path
 * @returns the pathname
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "getPathnameFromAbsolutePath", ({
    enumerable: true,
    get: function() {
        return getPathnameFromAbsolutePath;
    }
}));
function getPathnameFromAbsolutePath(absolutePath) {
    // Remove prefix including app dir
    let appDir = "/app/";
    if (!absolutePath.includes(appDir)) {
        appDir = "\\app\\";
    }
    const [, ...parts] = absolutePath.split(appDir);
    const relativePath = appDir[0] + parts.join(appDir);
    // remove extension
    const pathname = relativePath.split(".").slice(0, -1).join(".");
    return pathname;
} //# sourceMappingURL=get-pathname-from-absolute-path.js.map


/***/ }),

/***/ 785:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "proxyRequest", ({
    enumerable: true,
    get: function() {
        return proxyRequest;
    }
}));
const _cookies = __webpack_require__(4966);
const _nexturl = __webpack_require__(5683);
const _cleanurl = __webpack_require__(6512);
function proxyRequest(request, { dynamic }, hooks) {
    function handleNextUrlBailout(prop) {
        switch(prop){
            case "search":
            case "searchParams":
            case "toString":
            case "href":
            case "origin":
                hooks.staticGenerationBailout(`nextUrl.${prop}`);
                return;
            default:
                return;
        }
    }
    const cache = {};
    const handleForceStatic = (url, prop)=>{
        switch(prop){
            case "search":
                return "";
            case "searchParams":
                if (!cache.searchParams) cache.searchParams = new URLSearchParams();
                return cache.searchParams;
            case "url":
            case "href":
                if (!cache.url) cache.url = (0, _cleanurl.cleanURL)(url);
                return cache.url;
            case "toJSON":
            case "toString":
                if (!cache.url) cache.url = (0, _cleanurl.cleanURL)(url);
                if (!cache.toString) cache.toString = ()=>cache.url;
                return cache.toString;
            case "headers":
                if (!cache.headers) cache.headers = new Headers();
                return cache.headers;
            case "cookies":
                if (!cache.headers) cache.headers = new Headers();
                if (!cache.cookies) cache.cookies = new _cookies.RequestCookies(cache.headers);
                return cache.cookies;
            case "clone":
                if (!cache.url) cache.url = (0, _cleanurl.cleanURL)(url);
                return ()=>new _nexturl.NextURL(cache.url);
            default:
                break;
        }
    };
    const wrappedNextUrl = new Proxy(request.nextUrl, {
        get (target, prop) {
            handleNextUrlBailout(prop);
            if (dynamic === "force-static" && typeof prop === "string") {
                const result = handleForceStatic(target.href, prop);
                if (result !== undefined) return result;
            }
            const value = target[prop];
            if (typeof value === "function") {
                return value.bind(target);
            }
            return value;
        },
        set (target, prop, value) {
            handleNextUrlBailout(prop);
            target[prop] = value;
            return true;
        }
    });
    const handleReqBailout = (prop)=>{
        switch(prop){
            case "headers":
                hooks.headerHooks.headers();
                return;
            // if request.url is accessed directly instead of
            // request.nextUrl we bail since it includes query
            // values that can be relied on dynamically
            case "url":
            case "body":
            case "blob":
            case "json":
            case "text":
            case "arrayBuffer":
            case "formData":
                hooks.staticGenerationBailout(`request.${prop}`);
                return;
            default:
                return;
        }
    };
    return new Proxy(request, {
        get (target, prop) {
            handleReqBailout(prop);
            if (prop === "nextUrl") {
                return wrappedNextUrl;
            }
            if (dynamic === "force-static" && typeof prop === "string") {
                const result = handleForceStatic(target.url, prop);
                if (result !== undefined) return result;
            }
            const value = target[prop];
            if (typeof value === "function") {
                return value.bind(target);
            }
            return value;
        },
        set (target, prop, value) {
            handleReqBailout(prop);
            target[prop] = value;
            return true;
        }
    });
} //# sourceMappingURL=proxy-request.js.map


/***/ }),

/***/ 5003:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "resolveHandlerError", ({
    enumerable: true,
    get: function() {
        return resolveHandlerError;
    }
}));
const _notfound = __webpack_require__(1084);
const _redirect = __webpack_require__(2633);
const _responsehandlers = __webpack_require__(1048);
function resolveHandlerError(err) {
    if ((0, _redirect.isRedirectError)(err)) {
        const redirect = (0, _redirect.getURLFromRedirectError)(err);
        if (!redirect) {
            throw new Error("Invariant: Unexpected redirect url format");
        }
        // This is a redirect error! Send the redirect response.
        return (0, _responsehandlers.handleTemporaryRedirectResponse)(redirect, err.mutableCookies);
    }
    if ((0, _notfound.isNotFoundError)(err)) {
        // This is a not found error! Send the not found response.
        return (0, _responsehandlers.handleNotFoundResponse)();
    }
    // Return false to indicate that this is not a handled error.
    return false;
} //# sourceMappingURL=resolve-handler-error.js.map


/***/ }),

/***/ 3488:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    AppRouteRouteModule: function() {
        return AppRouteRouteModule;
    },
    default: function() {
        return _default;
    }
});
const _routemodule = __webpack_require__(531);
const _requestasyncstoragewrapper = __webpack_require__(6806);
const _staticgenerationasyncstoragewrapper = __webpack_require__(6992);
const _responsehandlers = __webpack_require__(1048);
const _http = __webpack_require__(1189);
const _patchfetch = __webpack_require__(1925);
const _tracer = __webpack_require__(5550);
const _constants = __webpack_require__(9032);
const _getpathnamefromabsolutepath = __webpack_require__(7986);
const _proxyrequest = __webpack_require__(785);
const _resolvehandlererror = __webpack_require__(5003);
const _log = /*#__PURE__*/ _interop_require_wildcard(__webpack_require__(8659));
const _autoimplementmethods = __webpack_require__(8474);
const _getnonstaticmethods = __webpack_require__(9226);
const _requestcookies = __webpack_require__(4277);
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
// These are imported weirdly like this because of the way that the bundling
// works. We need to import the built files from the dist directory, but we
// can't do that directly because we need types from the source files. So we
// import the types from the source files and then import the built files.
const { requestAsyncStorage } = __webpack_require__(3474);
const { staticGenerationAsyncStorage } = __webpack_require__(1062);
const serverHooks = __webpack_require__(6226);
const headerHooks = __webpack_require__(316);
const { staticGenerationBailout } = __webpack_require__(7931);
const { actionAsyncStorage } = __webpack_require__(7629);
class AppRouteRouteModule extends _routemodule.RouteModule {
    constructor({ userland, definition, resolvedPagePath, nextConfigOutput }){
        super({
            userland,
            definition
        });
        /**
   * A reference to the request async storage.
   */ this.requestAsyncStorage = requestAsyncStorage;
        /**
   * A reference to the static generation async storage.
   */ this.staticGenerationAsyncStorage = staticGenerationAsyncStorage;
        /**
   * An interface to call server hooks which interact with the underlying
   * storage.
   */ this.serverHooks = serverHooks;
        /**
   * An interface to call header hooks which interact with the underlying
   * request storage.
   */ this.headerHooks = headerHooks;
        /**
   * An interface to call static generation bailout hooks which interact with
   * the underlying static generation storage.
   */ this.staticGenerationBailout = staticGenerationBailout;
        /**
   * A reference to the mutation related async storage, such as mutations of
   * cookies.
   */ this.actionAsyncStorage = actionAsyncStorage;
        this.resolvedPagePath = resolvedPagePath;
        this.nextConfigOutput = nextConfigOutput;
        // Automatically implement some methods if they aren't implemented by the
        // userland module.
        this.methods = (0, _autoimplementmethods.autoImplementMethods)(userland);
        // Get the non-static methods for this route.
        this.nonStaticMethods = (0, _getnonstaticmethods.getNonStaticMethods)(userland);
        // Get the dynamic property from the userland module.
        this.dynamic = this.userland.dynamic;
        if (this.nextConfigOutput === "export") {
            if (!this.dynamic || this.dynamic === "auto") {
                this.dynamic = "error";
            } else if (this.dynamic === "force-dynamic") {
                throw new Error(`export const dynamic = "force-dynamic" on page "${definition.pathname}" cannot be used with "output: export". See more info here: https://nextjs.org/docs/advanced-features/static-html-export`);
            }
        }
        // We only warn in development after here, so return if we're not in
        // development.
        if (false) {}
    }
    /**
   * Resolves the handler function for the given method.
   *
   * @param method the requested method
   * @returns the handler function for the given method
   */ resolve(method) {
        // Ensure that the requested method is a valid method (to prevent RCE's).
        if (!(0, _http.isHTTPMethod)(method)) return _responsehandlers.handleBadRequestResponse;
        // Return the handler.
        return this.methods[method];
    }
    /**
   * Executes the route handler.
   */ async execute(request, context) {
        // Get the handler function for the given method.
        const handler = this.resolve(request.method);
        // Get the context for the request.
        const requestContext = {
            req: request
        };
        requestContext.renderOpts = {
            previewProps: context.prerenderManifest.preview
        };
        // Get the context for the static generation.
        const staticGenerationContext = {
            pathname: this.definition.pathname,
            renderOpts: // the default values.
            context.staticGenerationContext ?? {
                supportsDynamicHTML: false
            }
        };
        // Add the fetchCache option to the renderOpts.
        staticGenerationContext.renderOpts.fetchCache = this.userland.fetchCache;
        // Run the handler with the request AsyncLocalStorage to inject the helper
        // support. We set this to `unknown` because the type is not known until
        // runtime when we do a instanceof check below.
        const response = await this.actionAsyncStorage.run({
            isAppRoute: true
        }, ()=>{
            return _requestasyncstoragewrapper.RequestAsyncStorageWrapper.wrap(this.requestAsyncStorage, requestContext, ()=>{
                return _staticgenerationasyncstoragewrapper.StaticGenerationAsyncStorageWrapper.wrap(this.staticGenerationAsyncStorage, staticGenerationContext, (staticGenerationStore)=>{
                    var _getTracer_getRootSpanAttributes;
                    // Check to see if we should bail out of static generation based on
                    // having non-static methods.
                    if (this.nonStaticMethods) {
                        this.staticGenerationBailout(`non-static methods used ${this.nonStaticMethods.join(", ")}`);
                    }
                    // Update the static generation store based on the dynamic property.
                    switch(this.dynamic){
                        case "force-dynamic":
                            // The dynamic property is set to force-dynamic, so we should
                            // force the page to be dynamic.
                            staticGenerationStore.forceDynamic = true;
                            this.staticGenerationBailout(`force-dynamic`, {
                                dynamic: this.dynamic
                            });
                            break;
                        case "force-static":
                            // The dynamic property is set to force-static, so we should
                            // force the page to be static.
                            staticGenerationStore.forceStatic = true;
                            break;
                        case "error":
                            // The dynamic property is set to error, so we should throw an
                            // error if the page is being statically generated.
                            staticGenerationStore.dynamicShouldError = true;
                            break;
                        default:
                            break;
                    }
                    // If the static generation store does not have a revalidate value
                    // set, then we should set it the revalidate value from the userland
                    // module or default to false.
                    staticGenerationStore.revalidate ??= this.userland.revalidate ?? false;
                    // Wrap the request so we can add additional functionality to cases
                    // that might change it's output or affect the rendering.
                    const wrappedRequest = (0, _proxyrequest.proxyRequest)(request, {
                        dynamic: this.dynamic
                    }, {
                        headerHooks: this.headerHooks,
                        serverHooks: this.serverHooks,
                        staticGenerationBailout: this.staticGenerationBailout
                    });
                    // TODO: propagate this pathname from route matcher
                    const route = (0, _getpathnamefromabsolutepath.getPathnameFromAbsolutePath)(this.resolvedPagePath);
                    (_getTracer_getRootSpanAttributes = (0, _tracer.getTracer)().getRootSpanAttributes()) == null ? void 0 : _getTracer_getRootSpanAttributes.set("next.route", route);
                    return (0, _tracer.getTracer)().trace(_constants.AppRouteRouteHandlersSpan.runHandler, {
                        spanName: `executing api route (app) ${route}`,
                        attributes: {
                            "next.route": route
                        }
                    }, async ()=>{
                        var _staticGenerationStore_tags;
                        // Patch the global fetch.
                        (0, _patchfetch.patchFetch)({
                            serverHooks: this.serverHooks,
                            staticGenerationAsyncStorage: this.staticGenerationAsyncStorage
                        });
                        const res = await handler(wrappedRequest, {
                            params: context.params
                        });
                        context.staticGenerationContext.fetchMetrics = staticGenerationStore.fetchMetrics;
                        await Promise.all(staticGenerationStore.pendingRevalidates || []);
                        (0, _patchfetch.addImplicitTags)(staticGenerationStore);
                        context.staticGenerationContext.fetchTags = (_staticGenerationStore_tags = staticGenerationStore.tags) == null ? void 0 : _staticGenerationStore_tags.join(",");
                        // It's possible cookies were set in the handler, so we need
                        // to merge the modified cookies and the returned response
                        // here.
                        const requestStore = this.requestAsyncStorage.getStore();
                        if (requestStore && requestStore.mutableCookies) {
                            const headers = new Headers(res.headers);
                            if ((0, _requestcookies.appendMutableCookies)(headers, requestStore.mutableCookies)) {
                                return new Response(res.body, {
                                    status: res.status,
                                    statusText: res.statusText,
                                    headers
                                });
                            }
                        }
                        return res;
                    });
                });
            });
        });
        // If the handler did't return a valid response, then return the internal
        // error response.
        if (!(response instanceof Response)) {
            // TODO: validate the correct handling behavior, maybe log something?
            return (0, _responsehandlers.handleInternalServerErrorResponse)();
        }
        if (response.headers.has("x-middleware-rewrite")) {
            // TODO: move this error into the `NextResponse.rewrite()` function.
            // TODO-APP: re-enable support below when we can proxy these type of requests
            throw new Error("NextResponse.rewrite() was used in a app route handler, this is not currently supported. Please remove the invocation to continue.");
        // // This is a rewrite created via `NextResponse.rewrite()`. We need to send
        // // the response up so it can be handled by the backing server.
        // // If the server is running in minimal mode, we just want to forward the
        // // response (including the rewrite headers) upstream so it can perform the
        // // redirect for us, otherwise return with the special condition so this
        // // server can perform a rewrite.
        // if (!minimalMode) {
        //   return { response, condition: 'rewrite' }
        // }
        // // Relativize the url so it's relative to the base url. This is so the
        // // outgoing headers upstream can be relative.
        // const rewritePath = response.headers.get('x-middleware-rewrite')!
        // const initUrl = getRequestMeta(req, '__NEXT_INIT_URL')!
        // const { pathname } = parseUrl(relativizeURL(rewritePath, initUrl))
        // response.headers.set('x-middleware-rewrite', pathname)
        }
        if (response.headers.get("x-middleware-next") === "1") {
            // TODO: move this error into the `NextResponse.next()` function.
            throw new Error("NextResponse.next() was used in a app route handler, this is not supported. See here for more info: https://nextjs.org/docs/messages/next-response-next-in-app-route-handler");
        }
        return response;
    }
    async handle(request, context) {
        try {
            // Execute the route to get the response.
            const response = await this.execute(request, context);
            // The response was handled, return it.
            return response;
        } catch (err) {
            // Try to resolve the error to a response, else throw it again.
            const response = (0, _resolvehandlererror.resolveHandlerError)(err);
            if (!response) throw err;
            // The response was resolved, return it.
            return response;
        }
    }
}
const _default = AppRouteRouteModule; //# sourceMappingURL=module.js.map


/***/ }),

/***/ 1048:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    handleTemporaryRedirectResponse: function() {
        return handleTemporaryRedirectResponse;
    },
    handleBadRequestResponse: function() {
        return handleBadRequestResponse;
    },
    handleNotFoundResponse: function() {
        return handleNotFoundResponse;
    },
    handleMethodNotAllowedResponse: function() {
        return handleMethodNotAllowedResponse;
    },
    handleInternalServerErrorResponse: function() {
        return handleInternalServerErrorResponse;
    }
});
const _requestcookies = __webpack_require__(4277);
function handleTemporaryRedirectResponse(url, mutableCookies) {
    const headers = new Headers({
        location: url
    });
    (0, _requestcookies.appendMutableCookies)(headers, mutableCookies);
    return new Response(null, {
        status: 307,
        headers
    });
}
function handleBadRequestResponse() {
    return new Response(null, {
        status: 400
    });
}
function handleNotFoundResponse() {
    return new Response(null, {
        status: 404
    });
}
function handleMethodNotAllowedResponse() {
    return new Response(null, {
        status: 405
    });
}
function handleInternalServerErrorResponse() {
    return new Response(null, {
        status: 500
    });
} //# sourceMappingURL=response-handlers.js.map


/***/ }),

/***/ 531:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "RouteModule", ({
    enumerable: true,
    get: function() {
        return RouteModule;
    }
}));
class RouteModule {
    constructor({ userland, definition }){
        this.userland = userland;
        this.definition = definition;
    }
} //# sourceMappingURL=route-module.js.map


/***/ }),

/***/ 1925:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    addImplicitTags: function() {
        return addImplicitTags;
    },
    patchFetch: function() {
        return patchFetch;
    }
});
const _constants = __webpack_require__(9032);
const _tracer = __webpack_require__(5550);
const _constants1 = __webpack_require__(6824);
const isEdgeRuntime = "nodejs" === "edge";
function addImplicitTags(staticGenerationStore) {
    const newTags = [];
    const pathname = staticGenerationStore == null ? void 0 : staticGenerationStore.originalPathname;
    if (!pathname) {
        return newTags;
    }
    if (!Array.isArray(staticGenerationStore.tags)) {
        staticGenerationStore.tags = [];
    }
    if (!staticGenerationStore.tags.includes(pathname)) {
        staticGenerationStore.tags.push(pathname);
    }
    newTags.push(pathname);
    return newTags;
}
function trackFetchMetric(staticGenerationStore, ctx) {
    if (!staticGenerationStore) return;
    if (!staticGenerationStore.fetchMetrics) {
        staticGenerationStore.fetchMetrics = [];
    }
    const dedupeFields = [
        "url",
        "status",
        "method"
    ];
    // don't add metric if one already exists for the fetch
    if (staticGenerationStore.fetchMetrics.some((metric)=>{
        return dedupeFields.every((field)=>metric[field] === ctx[field]);
    })) {
        return;
    }
    staticGenerationStore.fetchMetrics.push({
        url: ctx.url,
        cacheStatus: ctx.cacheStatus,
        status: ctx.status,
        method: ctx.method,
        start: ctx.start,
        end: Date.now(),
        idx: staticGenerationStore.nextFetchId || 0
    });
}
function patchFetch({ serverHooks, staticGenerationAsyncStorage }) {
    if (!globalThis._nextOriginalFetch) {
        globalThis._nextOriginalFetch = globalThis.fetch;
    }
    if (globalThis.fetch.__nextPatched) return;
    const { DynamicServerError } = serverHooks;
    const originFetch = globalThis._nextOriginalFetch;
    globalThis.fetch = async (input, init)=>{
        var _init_method;
        let url;
        try {
            url = new URL(input instanceof Request ? input.url : input);
            url.username = "";
            url.password = "";
        } catch  {
            // Error caused by malformed URL should be handled by native fetch
            url = undefined;
        }
        const fetchUrl = (url == null ? void 0 : url.href) ?? "";
        const fetchStart = Date.now();
        const method = (init == null ? void 0 : (_init_method = init.method) == null ? void 0 : _init_method.toUpperCase()) || "GET";
        return await (0, _tracer.getTracer)().trace(_constants.AppRenderSpan.fetch, {
            kind: _tracer.SpanKind.CLIENT,
            spanName: [
                "fetch",
                method,
                fetchUrl
            ].filter(Boolean).join(" "),
            attributes: {
                "http.url": fetchUrl,
                "http.method": method,
                "net.peer.name": url == null ? void 0 : url.hostname,
                "net.peer.port": (url == null ? void 0 : url.port) || undefined
            }
        }, async ()=>{
            var _ref, _getRequestMeta;
            const staticGenerationStore = staticGenerationAsyncStorage.getStore();
            const isRequestInput = input && typeof input === "object" && typeof input.method === "string";
            const getRequestMeta = (field)=>{
                let value = isRequestInput ? input[field] : null;
                return value || (init == null ? void 0 : init[field]);
            };
            // If the staticGenerationStore is not available, we can't do any
            // special treatment of fetch, therefore fallback to the original
            // fetch implementation.
            if (!staticGenerationStore || ((_ref = init == null ? void 0 : init.next) == null ? void 0 : _ref.internal) || staticGenerationStore.isDraftMode) {
                return originFetch(input, init);
            }
            let revalidate = undefined;
            const getNextField = (field)=>{
                var _init_next, _init_next1, _input_next;
                return typeof (init == null ? void 0 : (_init_next = init.next) == null ? void 0 : _init_next[field]) !== "undefined" ? init == null ? void 0 : (_init_next1 = init.next) == null ? void 0 : _init_next1[field] : isRequestInput ? (_input_next = input.next) == null ? void 0 : _input_next[field] : undefined;
            };
            // RequestInit doesn't keep extra fields e.g. next so it's
            // only available if init is used separate
            let curRevalidate = getNextField("revalidate");
            const tags = getNextField("tags") || [];
            if (Array.isArray(tags)) {
                if (!staticGenerationStore.tags) {
                    staticGenerationStore.tags = [];
                }
                for (const tag of tags){
                    if (!staticGenerationStore.tags.includes(tag)) {
                        staticGenerationStore.tags.push(tag);
                    }
                }
            }
            const implicitTags = addImplicitTags(staticGenerationStore);
            for (const tag of implicitTags || []){
                if (!tags.includes(tag)) {
                    tags.push(tag);
                }
            }
            const isOnlyCache = staticGenerationStore.fetchCache === "only-cache";
            const isForceCache = staticGenerationStore.fetchCache === "force-cache";
            const isDefaultCache = staticGenerationStore.fetchCache === "default-cache";
            const isDefaultNoStore = staticGenerationStore.fetchCache === "default-no-store";
            const isOnlyNoStore = staticGenerationStore.fetchCache === "only-no-store";
            const isForceNoStore = staticGenerationStore.fetchCache === "force-no-store";
            let _cache = getRequestMeta("cache");
            if (typeof _cache === "string" && typeof curRevalidate !== "undefined") {
                console.warn(`Warning: fetch for ${fetchUrl} on ${staticGenerationStore.pathname} specified "cache: ${_cache}" and "revalidate: ${curRevalidate}", only one should be specified.`);
                _cache = undefined;
            }
            if (_cache === "force-cache") {
                curRevalidate = false;
            }
            if ([
                "no-cache",
                "no-store"
            ].includes(_cache || "")) {
                curRevalidate = 0;
            }
            if (typeof curRevalidate === "number" || curRevalidate === false) {
                revalidate = curRevalidate;
            }
            let cacheReason = "";
            const _headers = getRequestMeta("headers");
            const initHeaders = typeof (_headers == null ? void 0 : _headers.get) === "function" ? _headers : new Headers(_headers || {});
            const hasUnCacheableHeader = initHeaders.get("authorization") || initHeaders.get("cookie");
            const isUnCacheableMethod = ![
                "get",
                "head"
            ].includes(((_getRequestMeta = getRequestMeta("method")) == null ? void 0 : _getRequestMeta.toLowerCase()) || "get");
            // if there are authorized headers or a POST method and
            // dynamic data usage was present above the tree we bail
            // e.g. if cookies() is used before an authed/POST fetch
            const autoNoCache = (hasUnCacheableHeader || isUnCacheableMethod) && staticGenerationStore.revalidate === 0;
            if (isForceNoStore) {
                revalidate = 0;
                cacheReason = "fetchCache = force-no-store";
            }
            if (isOnlyNoStore) {
                if (_cache === "force-cache" || revalidate === 0) {
                    throw new Error(`cache: 'force-cache' used on fetch for ${fetchUrl} with 'export const fetchCache = 'only-no-store'`);
                }
                revalidate = 0;
                cacheReason = "fetchCache = only-no-store";
            }
            if (isOnlyCache && _cache === "no-store") {
                throw new Error(`cache: 'no-store' used on fetch for ${fetchUrl} with 'export const fetchCache = 'only-cache'`);
            }
            if (isForceCache && (typeof curRevalidate === "undefined" || curRevalidate === 0)) {
                cacheReason = "fetchCache = force-cache";
                revalidate = false;
            }
            if (typeof revalidate === "undefined") {
                if (isDefaultCache) {
                    revalidate = false;
                    cacheReason = "fetchCache = default-cache";
                } else if (autoNoCache) {
                    revalidate = 0;
                    cacheReason = "auto no cache";
                } else if (isDefaultNoStore) {
                    revalidate = 0;
                    cacheReason = "fetchCache = default-no-store";
                } else {
                    cacheReason = "auto cache";
                    revalidate = typeof staticGenerationStore.revalidate === "boolean" || typeof staticGenerationStore.revalidate === "undefined" ? false : staticGenerationStore.revalidate;
                }
            } else if (!cacheReason) {
                cacheReason = `revalidate: ${revalidate}`;
            }
            if (// revalidate although if it occurs during build we do
            !autoNoCache && (typeof staticGenerationStore.revalidate === "undefined" || typeof revalidate === "number" && (staticGenerationStore.revalidate === false || typeof staticGenerationStore.revalidate === "number" && revalidate < staticGenerationStore.revalidate))) {
                staticGenerationStore.revalidate = revalidate;
            }
            const isCacheableRevalidate = typeof revalidate === "number" && revalidate > 0 || revalidate === false;
            let cacheKey;
            if (staticGenerationStore.incrementalCache && isCacheableRevalidate) {
                try {
                    cacheKey = await staticGenerationStore.incrementalCache.fetchCacheKey(fetchUrl, isRequestInput ? input : init);
                } catch (err) {
                    console.error(`Failed to generate cache key for`, input);
                }
            }
            const requestInputFields = [
                "cache",
                "credentials",
                "headers",
                "integrity",
                "keepalive",
                "method",
                "mode",
                "redirect",
                "referrer",
                "referrerPolicy",
                "signal",
                "window",
                "duplex"
            ];
            if (isRequestInput) {
                const reqInput = input;
                const reqOptions = {
                    body: reqInput._ogBody || reqInput.body
                };
                for (const field of requestInputFields){
                    // @ts-expect-error custom fields
                    reqOptions[field] = reqInput[field];
                }
                input = new Request(reqInput.url, reqOptions);
            } else if (init) {
                const initialInit = init;
                init = {
                    body: init._ogBody || init.body
                };
                for (const field of requestInputFields){
                    // @ts-expect-error custom fields
                    init[field] = initialInit[field];
                }
            }
            const fetchIdx = staticGenerationStore.nextFetchId ?? 1;
            staticGenerationStore.nextFetchId = fetchIdx + 1;
            const normalizedRevalidate = typeof revalidate !== "number" ? _constants1.CACHE_ONE_YEAR : revalidate;
            const doOriginalFetch = async (isStale)=>{
                // add metadata to init without editing the original
                const clonedInit = {
                    ...init,
                    next: {
                        ...init == null ? void 0 : init.next,
                        fetchType: "origin",
                        fetchIdx
                    }
                };
                return originFetch(input, clonedInit).then(async (res)=>{
                    if (!isStale) {
                        trackFetchMetric(staticGenerationStore, {
                            start: fetchStart,
                            url: fetchUrl,
                            cacheReason,
                            cacheStatus: "miss",
                            status: res.status,
                            method: clonedInit.method || "GET"
                        });
                    }
                    if (res.status === 200 && staticGenerationStore.incrementalCache && cacheKey && isCacheableRevalidate) {
                        const bodyBuffer = Buffer.from(await res.arrayBuffer());
                        try {
                            await staticGenerationStore.incrementalCache.set(cacheKey, {
                                kind: "FETCH",
                                data: {
                                    headers: Object.fromEntries(res.headers.entries()),
                                    body: bodyBuffer.toString("base64"),
                                    status: res.status,
                                    tags,
                                    url: res.url
                                },
                                revalidate: normalizedRevalidate
                            }, revalidate, true, fetchUrl, fetchIdx);
                        } catch (err) {
                            console.warn(`Failed to set fetch cache`, input, err);
                        }
                        const response = new Response(bodyBuffer, {
                            headers: new Headers(res.headers),
                            status: res.status
                        });
                        Object.defineProperty(response, "url", {
                            value: res.url
                        });
                        return response;
                    }
                    return res;
                });
            };
            if (cacheKey && (staticGenerationStore == null ? void 0 : staticGenerationStore.incrementalCache)) {
                const entry = staticGenerationStore.isOnDemandRevalidate ? null : await staticGenerationStore.incrementalCache.get(cacheKey, true, revalidate, fetchUrl, fetchIdx);
                if ((entry == null ? void 0 : entry.value) && entry.value.kind === "FETCH") {
                    const currentTags = entry.value.data.tags;
                    // when stale and is revalidating we wait for fresh data
                    // so the revalidated entry has the updated data
                    if (!(staticGenerationStore.isRevalidate && entry.isStale)) {
                        if (entry.isStale) {
                            if (!staticGenerationStore.pendingRevalidates) {
                                staticGenerationStore.pendingRevalidates = [];
                            }
                            staticGenerationStore.pendingRevalidates.push(doOriginalFetch(true).catch(console.error));
                        } else if (tags && !tags.every((tag)=>{
                            return currentTags == null ? void 0 : currentTags.includes(tag);
                        })) {
                            var _staticGenerationStore_incrementalCache;
                            // if new tags are being added we need to set even if
                            // the data isn't stale
                            if (!entry.value.data.tags) {
                                entry.value.data.tags = [];
                            }
                            for (const tag of tags){
                                if (!entry.value.data.tags.includes(tag)) {
                                    entry.value.data.tags.push(tag);
                                }
                            }
                            (_staticGenerationStore_incrementalCache = staticGenerationStore.incrementalCache) == null ? void 0 : _staticGenerationStore_incrementalCache.set(cacheKey, entry.value, revalidate, true, fetchUrl, fetchIdx);
                        }
                        const resData = entry.value.data;
                        let decodedBody;
                        if (false) {} else {
                            decodedBody = Buffer.from(resData.body, "base64").subarray();
                        }
                        trackFetchMetric(staticGenerationStore, {
                            start: fetchStart,
                            url: fetchUrl,
                            cacheReason,
                            cacheStatus: "hit",
                            status: resData.status || 200,
                            method: (init == null ? void 0 : init.method) || "GET"
                        });
                        const response = new Response(decodedBody, {
                            headers: resData.headers,
                            status: resData.status
                        });
                        Object.defineProperty(response, "url", {
                            value: entry.value.data.url
                        });
                        return response;
                    }
                }
            }
            if (staticGenerationStore.isStaticGeneration) {
                if (init && typeof init === "object") {
                    const cache = init.cache;
                    // Delete `cache` property as Cloudflare Workers will throw an error
                    if (isEdgeRuntime) {
                        delete init.cache;
                    }
                    if (cache === "no-store") {
                        staticGenerationStore.revalidate = 0;
                        const dynamicUsageReason = `no-store fetch ${input}${staticGenerationStore.pathname ? ` ${staticGenerationStore.pathname}` : ""}`;
                        const err = new DynamicServerError(dynamicUsageReason);
                        staticGenerationStore.dynamicUsageErr = err;
                        staticGenerationStore.dynamicUsageStack = err.stack;
                        staticGenerationStore.dynamicUsageDescription = dynamicUsageReason;
                    }
                    const hasNextConfig = "next" in init;
                    const next = init.next || {};
                    if (typeof next.revalidate === "number" && (typeof staticGenerationStore.revalidate === "undefined" || typeof staticGenerationStore.revalidate === "number" && next.revalidate < staticGenerationStore.revalidate)) {
                        const forceDynamic = staticGenerationStore.forceDynamic;
                        if (!forceDynamic || next.revalidate !== 0) {
                            staticGenerationStore.revalidate = next.revalidate;
                        }
                        if (!forceDynamic && next.revalidate === 0) {
                            const dynamicUsageReason = `revalidate: ${next.revalidate} fetch ${input}${staticGenerationStore.pathname ? ` ${staticGenerationStore.pathname}` : ""}`;
                            const err = new DynamicServerError(dynamicUsageReason);
                            staticGenerationStore.dynamicUsageErr = err;
                            staticGenerationStore.dynamicUsageStack = err.stack;
                            staticGenerationStore.dynamicUsageDescription = dynamicUsageReason;
                        }
                    }
                    if (hasNextConfig) delete init.next;
                }
            }
            return doOriginalFetch();
        });
    };
    globalThis.fetch.__nextGetStaticStore = ()=>{
        return staticGenerationAsyncStorage;
    };
    globalThis.fetch.__nextPatched = true;
} //# sourceMappingURL=patch-fetch.js.map


/***/ }),

/***/ 9032:
/***/ ((__unused_webpack_module, exports) => {

/**
 * Contains predefined constants for the trace span name in next/server.
 *
 * Currently, next/server/tracer is internal implementation only for tracking
 * next.js's implementation only with known span names defined here.
 **/ // eslint typescript has a bug with TS enums
/* eslint-disable no-shadow */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    NextVanillaSpanAllowlist: function() {
        return NextVanillaSpanAllowlist;
    },
    BaseServerSpan: function() {
        return BaseServerSpan;
    },
    LoadComponentsSpan: function() {
        return LoadComponentsSpan;
    },
    NextServerSpan: function() {
        return NextServerSpan;
    },
    NextNodeServerSpan: function() {
        return NextNodeServerSpan;
    },
    StartServerSpan: function() {
        return StartServerSpan;
    },
    RenderSpan: function() {
        return RenderSpan;
    },
    RouterSpan: function() {
        return RouterSpan;
    },
    AppRenderSpan: function() {
        return AppRenderSpan;
    },
    NodeSpan: function() {
        return NodeSpan;
    },
    AppRouteRouteHandlersSpan: function() {
        return AppRouteRouteHandlersSpan;
    },
    ResolveMetadataSpan: function() {
        return ResolveMetadataSpan;
    }
});
var BaseServerSpan;
(function(BaseServerSpan) {
    BaseServerSpan["handleRequest"] = "BaseServer.handleRequest";
    BaseServerSpan["run"] = "BaseServer.run";
    BaseServerSpan["pipe"] = "BaseServer.pipe";
    BaseServerSpan["getStaticHTML"] = "BaseServer.getStaticHTML";
    BaseServerSpan["render"] = "BaseServer.render";
    BaseServerSpan["renderToResponseWithComponents"] = "BaseServer.renderToResponseWithComponents";
    BaseServerSpan["renderToResponse"] = "BaseServer.renderToResponse";
    BaseServerSpan["renderToHTML"] = "BaseServer.renderToHTML";
    BaseServerSpan["renderError"] = "BaseServer.renderError";
    BaseServerSpan["renderErrorToResponse"] = "BaseServer.renderErrorToResponse";
    BaseServerSpan["renderErrorToHTML"] = "BaseServer.renderErrorToHTML";
    BaseServerSpan["render404"] = "BaseServer.render404";
})(BaseServerSpan || (BaseServerSpan = {}));
var LoadComponentsSpan;
(function(LoadComponentsSpan) {
    LoadComponentsSpan["loadDefaultErrorComponents"] = "LoadComponents.loadDefaultErrorComponents";
    LoadComponentsSpan["loadComponents"] = "LoadComponents.loadComponents";
})(LoadComponentsSpan || (LoadComponentsSpan = {}));
var NextServerSpan;
(function(NextServerSpan) {
    NextServerSpan["getRequestHandler"] = "NextServer.getRequestHandler";
    NextServerSpan["getServer"] = "NextServer.getServer";
    NextServerSpan["getServerRequestHandler"] = "NextServer.getServerRequestHandler";
    NextServerSpan["createServer"] = "createServer.createServer";
})(NextServerSpan || (NextServerSpan = {}));
var NextNodeServerSpan;
(function(NextNodeServerSpan) {
    NextNodeServerSpan["compression"] = "NextNodeServer.compression";
    NextNodeServerSpan["getBuildId"] = "NextNodeServer.getBuildId";
    NextNodeServerSpan["generateStaticRoutes"] = "NextNodeServer.generateStaticRoutes";
    NextNodeServerSpan["generateFsStaticRoutes"] = "NextNodeServer.generateFsStaticRoutes";
    NextNodeServerSpan["generatePublicRoutes"] = "NextNodeServer.generatePublicRoutes";
    NextNodeServerSpan["generateImageRoutes"] = "NextNodeServer.generateImageRoutes.route";
    NextNodeServerSpan["sendRenderResult"] = "NextNodeServer.sendRenderResult";
    NextNodeServerSpan["sendStatic"] = "NextNodeServer.sendStatic";
    NextNodeServerSpan["proxyRequest"] = "NextNodeServer.proxyRequest";
    NextNodeServerSpan["runApi"] = "NextNodeServer.runApi";
    NextNodeServerSpan["render"] = "NextNodeServer.render";
    NextNodeServerSpan["renderHTML"] = "NextNodeServer.renderHTML";
    NextNodeServerSpan["imageOptimizer"] = "NextNodeServer.imageOptimizer";
    NextNodeServerSpan["getPagePath"] = "NextNodeServer.getPagePath";
    NextNodeServerSpan["getRoutesManifest"] = "NextNodeServer.getRoutesManifest";
    NextNodeServerSpan["findPageComponents"] = "NextNodeServer.findPageComponents";
    NextNodeServerSpan["getFontManifest"] = "NextNodeServer.getFontManifest";
    NextNodeServerSpan["getServerComponentManifest"] = "NextNodeServer.getServerComponentManifest";
    NextNodeServerSpan["getRequestHandler"] = "NextNodeServer.getRequestHandler";
    NextNodeServerSpan["renderToHTML"] = "NextNodeServer.renderToHTML";
    NextNodeServerSpan["renderError"] = "NextNodeServer.renderError";
    NextNodeServerSpan["renderErrorToHTML"] = "NextNodeServer.renderErrorToHTML";
    NextNodeServerSpan["render404"] = "NextNodeServer.render404";
    NextNodeServerSpan["route"] = "route";
    NextNodeServerSpan["onProxyReq"] = "onProxyReq";
    NextNodeServerSpan["apiResolver"] = "apiResolver";
})(NextNodeServerSpan || (NextNodeServerSpan = {}));
var StartServerSpan;
(function(StartServerSpan) {
    StartServerSpan["startServer"] = "startServer.startServer";
})(StartServerSpan || (StartServerSpan = {}));
var RenderSpan;
(function(RenderSpan) {
    RenderSpan["getServerSideProps"] = "Render.getServerSideProps";
    RenderSpan["getStaticProps"] = "Render.getStaticProps";
    RenderSpan["renderToString"] = "Render.renderToString";
    RenderSpan["renderDocument"] = "Render.renderDocument";
    RenderSpan["createBodyResult"] = "Render.createBodyResult";
})(RenderSpan || (RenderSpan = {}));
var AppRenderSpan;
(function(AppRenderSpan) {
    AppRenderSpan["renderToString"] = "AppRender.renderToString";
    AppRenderSpan["renderToReadableStream"] = "AppRender.renderToReadableStream";
    AppRenderSpan["getBodyResult"] = "AppRender.getBodyResult";
    AppRenderSpan["fetch"] = "AppRender.fetch";
})(AppRenderSpan || (AppRenderSpan = {}));
var RouterSpan;
(function(RouterSpan) {
    RouterSpan["executeRoute"] = "Router.executeRoute";
})(RouterSpan || (RouterSpan = {}));
var NodeSpan;
(function(NodeSpan) {
    NodeSpan["runHandler"] = "Node.runHandler";
})(NodeSpan || (NodeSpan = {}));
var AppRouteRouteHandlersSpan;
(function(AppRouteRouteHandlersSpan) {
    AppRouteRouteHandlersSpan["runHandler"] = "AppRouteRouteHandlers.runHandler";
})(AppRouteRouteHandlersSpan || (AppRouteRouteHandlersSpan = {}));
var ResolveMetadataSpan;
(function(ResolveMetadataSpan) {
    ResolveMetadataSpan["generateMetadata"] = "ResolveMetadata.generateMetadata";
})(ResolveMetadataSpan || (ResolveMetadataSpan = {}));
const NextVanillaSpanAllowlist = [
    "BaseServer.handleRequest",
    "Render.getServerSideProps",
    "Render.getStaticProps",
    "AppRender.fetch",
    "AppRender.getBodyResult",
    "Render.renderDocument",
    "Node.runHandler",
    "AppRouteRouteHandlers.runHandler",
    "ResolveMetadata.generateMetadata"
]; //# sourceMappingURL=constants.js.map


/***/ }),

/***/ 5550:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getTracer: function() {
        return getTracer;
    },
    SpanStatusCode: function() {
        return SpanStatusCode;
    },
    SpanKind: function() {
        return SpanKind;
    }
});
const _constants = __webpack_require__(9032);
let api;
// we want to allow users to use their own version of @opentelemetry/api if they
// want to, so we try to require it first, and if it fails we fall back to the
// version that is bundled with Next.js
// this is because @opentelemetry/api has to be synced with the version of
// @opentelemetry/tracing that is used, and we don't want to force users to use
// the version that is bundled with Next.js.
// the API is ~stable, so this should be fine
if (false) {} else {
    try {
        api = __webpack_require__(1790);
    } catch (err) {
        api = __webpack_require__(8015);
    }
}
const { context, trace, SpanStatusCode, SpanKind } = api;
const isPromise = (p)=>{
    return p !== null && typeof p === "object" && typeof p.then === "function";
};
const closeSpanWithError = (span, error)=>{
    if (error) {
        span.recordException(error);
    }
    span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error == null ? void 0 : error.message
    });
    span.end();
};
/** we use this map to propagate attributes from nested spans to the top span */ const rootSpanAttributesStore = new Map();
const rootSpanIdKey = api.createContextKey("next.rootSpanId");
let lastSpanId = 0;
const getSpanId = ()=>lastSpanId++;
class NextTracerImpl {
    /**
   * Returns an instance to the trace with configured name.
   * Since wrap / trace can be defined in any place prior to actual trace subscriber initialization,
   * This should be lazily evaluated.
   */ getTracerInstance() {
        return trace.getTracer("next.js", "0.0.1");
    }
    getContext() {
        return context;
    }
    getActiveScopeSpan() {
        return trace.getSpan(context == null ? void 0 : context.active());
    }
    trace(...args) {
        const [type, fnOrOptions, fnOrEmpty] = args;
        // coerce options form overload
        const { fn, options } = typeof fnOrOptions === "function" ? {
            fn: fnOrOptions,
            options: {}
        } : {
            fn: fnOrEmpty,
            options: {
                ...fnOrOptions
            }
        };
        if (!_constants.NextVanillaSpanAllowlist.includes(type) && process.env.NEXT_OTEL_VERBOSE !== "1" || options.hideSpan) {
            return fn();
        }
        const spanName = options.spanName ?? type;
        // Trying to get active scoped span to assign parent. If option specifies parent span manually, will try to use it.
        let spanContext = this.getSpanContext((options == null ? void 0 : options.parentSpan) ?? this.getActiveScopeSpan());
        let isRootSpan = false;
        if (!spanContext) {
            spanContext = api.ROOT_CONTEXT;
            isRootSpan = true;
        }
        const spanId = getSpanId();
        options.attributes = {
            "next.span_name": spanName,
            "next.span_type": type,
            ...options.attributes
        };
        return api.context.with(spanContext.setValue(rootSpanIdKey, spanId), ()=>this.getTracerInstance().startActiveSpan(spanName, options, (span)=>{
                const onCleanup = ()=>{
                    rootSpanAttributesStore.delete(spanId);
                };
                if (isRootSpan) {
                    rootSpanAttributesStore.set(spanId, new Map(Object.entries(options.attributes ?? {})));
                }
                try {
                    if (fn.length > 1) {
                        return fn(span, (err)=>closeSpanWithError(span, err));
                    }
                    const result = fn(span);
                    if (isPromise(result)) {
                        result.then(()=>span.end(), (err)=>closeSpanWithError(span, err)).finally(onCleanup);
                    } else {
                        span.end();
                        onCleanup();
                    }
                    return result;
                } catch (err) {
                    closeSpanWithError(span, err);
                    onCleanup();
                    throw err;
                }
            }));
    }
    wrap(...args) {
        const tracer = this;
        const [name, options, fn] = args.length === 3 ? args : [
            args[0],
            {},
            args[1]
        ];
        if (!_constants.NextVanillaSpanAllowlist.includes(name) && process.env.NEXT_OTEL_VERBOSE !== "1") {
            return fn;
        }
        return function() {
            let optionsObj = options;
            if (typeof optionsObj === "function" && typeof fn === "function") {
                optionsObj = optionsObj.apply(this, arguments);
            }
            const lastArgId = arguments.length - 1;
            const cb = arguments[lastArgId];
            if (typeof cb === "function") {
                const scopeBoundCb = tracer.getContext().bind(context.active(), cb);
                return tracer.trace(name, optionsObj, (_span, done)=>{
                    arguments[lastArgId] = function(err) {
                        done == null ? void 0 : done(err);
                        return scopeBoundCb.apply(this, arguments);
                    };
                    return fn.apply(this, arguments);
                });
            } else {
                return tracer.trace(name, optionsObj, ()=>fn.apply(this, arguments));
            }
        };
    }
    startSpan(...args) {
        const [type, options] = args;
        const spanContext = this.getSpanContext((options == null ? void 0 : options.parentSpan) ?? this.getActiveScopeSpan());
        return this.getTracerInstance().startSpan(type, options, spanContext);
    }
    getSpanContext(parentSpan) {
        const spanContext = parentSpan ? trace.setSpan(context.active(), parentSpan) : undefined;
        return spanContext;
    }
    getRootSpanAttributes() {
        const spanId = context.active().getValue(rootSpanIdKey);
        return rootSpanAttributesStore.get(spanId);
    }
}
const getTracer = (()=>{
    const tracer = new NextTracerImpl();
    return ()=>tracer;
})(); //# sourceMappingURL=tracer.js.map


/***/ }),

/***/ 6519:
/***/ (() => {

/**
 * Polyfills the `Headers.getAll(name)` method so it'll work in the edge
 * runtime.
 */ 
if (!("getAll" in Headers.prototype)) {
    // @ts-expect-error - this is polyfilling this method so it doesn't exist yet
    Headers.prototype.getAll = function(name) {
        name = name.toLowerCase();
        if (name !== "set-cookie") throw new Error("Headers.getAll is only supported for Set-Cookie header");
        const headers = [
            ...this.entries()
        ].filter(([key])=>key === name);
        return headers.map(([, value])=>value);
    };
} //# sourceMappingURL=node-polyfill-headers.js.map


/***/ }),

/***/ 1189:
/***/ ((__unused_webpack_module, exports) => {

/**
 * List of valid HTTP methods that can be implemented by Next.js's Custom App
 * Routes.
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    HTTP_METHODS: function() {
        return HTTP_METHODS;
    },
    isHTTPMethod: function() {
        return isHTTPMethod;
    }
});
const HTTP_METHODS = [
    "GET",
    "HEAD",
    "OPTIONS",
    "POST",
    "PUT",
    "DELETE",
    "PATCH"
];
function isHTTPMethod(maybeMethod) {
    return HTTP_METHODS.includes(maybeMethod);
} //# sourceMappingURL=http.js.map


/***/ }),

/***/ 5683:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "NextURL", ({
    enumerable: true,
    get: function() {
        return NextURL;
    }
}));
const _detectdomainlocale = __webpack_require__(3645);
const _formatnextpathnameinfo = __webpack_require__(7829);
const _gethostname = __webpack_require__(404);
const _getnextpathnameinfo = __webpack_require__(7969);
const REGEX_LOCALHOST_HOSTNAME = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|::1|localhost)/;
function parseURL(url, base) {
    return new URL(String(url).replace(REGEX_LOCALHOST_HOSTNAME, "localhost"), base && String(base).replace(REGEX_LOCALHOST_HOSTNAME, "localhost"));
}
const Internal = Symbol("NextURLInternal");
class NextURL {
    constructor(input, baseOrOpts, opts){
        let base;
        let options;
        if (typeof baseOrOpts === "object" && "pathname" in baseOrOpts || typeof baseOrOpts === "string") {
            base = baseOrOpts;
            options = opts || {};
        } else {
            options = opts || baseOrOpts || {};
        }
        this[Internal] = {
            url: parseURL(input, base ?? options.base),
            options: options,
            basePath: ""
        };
        this.analyze();
    }
    analyze() {
        var _this_Internal_options_nextConfig, _this_Internal_options_nextConfig_i18n, _this_Internal_domainLocale, _this_Internal_options_nextConfig1, _this_Internal_options_nextConfig_i18n1;
        const info = (0, _getnextpathnameinfo.getNextPathnameInfo)(this[Internal].url.pathname, {
            nextConfig: this[Internal].options.nextConfig,
            parseData: !undefined,
            i18nProvider: this[Internal].options.i18nProvider
        });
        const hostname = (0, _gethostname.getHostname)(this[Internal].url, this[Internal].options.headers);
        this[Internal].domainLocale = this[Internal].options.i18nProvider ? this[Internal].options.i18nProvider.detectDomainLocale(hostname) : (0, _detectdomainlocale.detectDomainLocale)((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.domains, hostname);
        const defaultLocale = ((_this_Internal_domainLocale = this[Internal].domainLocale) == null ? void 0 : _this_Internal_domainLocale.defaultLocale) || ((_this_Internal_options_nextConfig1 = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n1 = _this_Internal_options_nextConfig1.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n1.defaultLocale);
        this[Internal].url.pathname = info.pathname;
        this[Internal].defaultLocale = defaultLocale;
        this[Internal].basePath = info.basePath ?? "";
        this[Internal].buildId = info.buildId;
        this[Internal].locale = info.locale ?? defaultLocale;
        this[Internal].trailingSlash = info.trailingSlash;
    }
    formatPathname() {
        return (0, _formatnextpathnameinfo.formatNextPathnameInfo)({
            basePath: this[Internal].basePath,
            buildId: this[Internal].buildId,
            defaultLocale: !this[Internal].options.forceLocale ? this[Internal].defaultLocale : undefined,
            locale: this[Internal].locale,
            pathname: this[Internal].url.pathname,
            trailingSlash: this[Internal].trailingSlash
        });
    }
    formatSearch() {
        return this[Internal].url.search;
    }
    get buildId() {
        return this[Internal].buildId;
    }
    set buildId(buildId) {
        this[Internal].buildId = buildId;
    }
    get locale() {
        return this[Internal].locale ?? "";
    }
    set locale(locale) {
        var _this_Internal_options_nextConfig, _this_Internal_options_nextConfig_i18n;
        if (!this[Internal].locale || !((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.locales.includes(locale))) {
            throw new TypeError(`The NextURL configuration includes no locale "${locale}"`);
        }
        this[Internal].locale = locale;
    }
    get defaultLocale() {
        return this[Internal].defaultLocale;
    }
    get domainLocale() {
        return this[Internal].domainLocale;
    }
    get searchParams() {
        return this[Internal].url.searchParams;
    }
    get host() {
        return this[Internal].url.host;
    }
    set host(value) {
        this[Internal].url.host = value;
    }
    get hostname() {
        return this[Internal].url.hostname;
    }
    set hostname(value) {
        this[Internal].url.hostname = value;
    }
    get port() {
        return this[Internal].url.port;
    }
    set port(value) {
        this[Internal].url.port = value;
    }
    get protocol() {
        return this[Internal].url.protocol;
    }
    set protocol(value) {
        this[Internal].url.protocol = value;
    }
    get href() {
        const pathname = this.formatPathname();
        const search = this.formatSearch();
        return `${this.protocol}//${this.host}${pathname}${search}${this.hash}`;
    }
    set href(url) {
        this[Internal].url = parseURL(url);
        this.analyze();
    }
    get origin() {
        return this[Internal].url.origin;
    }
    get pathname() {
        return this[Internal].url.pathname;
    }
    set pathname(value) {
        this[Internal].url.pathname = value;
    }
    get hash() {
        return this[Internal].url.hash;
    }
    set hash(value) {
        this[Internal].url.hash = value;
    }
    get search() {
        return this[Internal].url.search;
    }
    set search(value) {
        this[Internal].url.search = value;
    }
    get password() {
        return this[Internal].url.password;
    }
    set password(value) {
        this[Internal].url.password = value;
    }
    get username() {
        return this[Internal].url.username;
    }
    set username(value) {
        this[Internal].url.username = value;
    }
    get basePath() {
        return this[Internal].basePath;
    }
    set basePath(value) {
        this[Internal].basePath = value.startsWith("/") ? value : `/${value}`;
    }
    toString() {
        return this.href;
    }
    toJSON() {
        return this.href;
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
            href: this.href,
            origin: this.origin,
            protocol: this.protocol,
            username: this.username,
            password: this.password,
            host: this.host,
            hostname: this.hostname,
            port: this.port,
            pathname: this.pathname,
            search: this.search,
            searchParams: this.searchParams,
            hash: this.hash
        };
    }
    clone() {
        return new NextURL(String(this), this[Internal].options);
    }
} //# sourceMappingURL=next-url.js.map


/***/ }),

/***/ 2022:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ReadonlyHeadersError: function() {
        return ReadonlyHeadersError;
    },
    HeadersAdapter: function() {
        return HeadersAdapter;
    }
});
const _reflect = __webpack_require__(8980);
class ReadonlyHeadersError extends Error {
    constructor(){
        super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
    }
    static callable() {
        throw new ReadonlyHeadersError();
    }
}
class HeadersAdapter extends Headers {
    constructor(headers){
        // We've already overridden the methods that would be called, so we're just
        // calling the super constructor to ensure that the instanceof check works.
        super();
        this.headers = new Proxy(headers, {
            get (target, prop, receiver) {
                // Because this is just an object, we expect that all "get" operations
                // are for properties. If it's a "get" for a symbol, we'll just return
                // the symbol.
                if (typeof prop === "symbol") {
                    return _reflect.ReflectAdapter.get(target, prop, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return undefined.
                if (typeof original === "undefined") return;
                // If the original casing exists, return the value.
                return _reflect.ReflectAdapter.get(target, original, receiver);
            },
            set (target, prop, value, receiver) {
                if (typeof prop === "symbol") {
                    return _reflect.ReflectAdapter.set(target, prop, value, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, use the prop as the key.
                return _reflect.ReflectAdapter.set(target, original ?? prop, value, receiver);
            },
            has (target, prop) {
                if (typeof prop === "symbol") return _reflect.ReflectAdapter.has(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return false.
                if (typeof original === "undefined") return false;
                // If the original casing exists, return true.
                return _reflect.ReflectAdapter.has(target, original);
            },
            deleteProperty (target, prop) {
                if (typeof prop === "symbol") return _reflect.ReflectAdapter.deleteProperty(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return true.
                if (typeof original === "undefined") return true;
                // If the original casing exists, delete the property.
                return _reflect.ReflectAdapter.deleteProperty(target, original);
            }
        });
    }
    /**
   * Seals a Headers instance to prevent modification by throwing an error when
   * any mutating method is called.
   */ static seal(headers) {
        return new Proxy(headers, {
            get (target, prop, receiver) {
                switch(prop){
                    case "append":
                    case "delete":
                    case "set":
                        return ReadonlyHeadersError.callable;
                    default:
                        return _reflect.ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
    /**
   * Merges a header value into a string. This stores multiple values as an
   * array, so we need to merge them into a string.
   *
   * @param value a header value
   * @returns a merged header value (a string)
   */ merge(value) {
        if (Array.isArray(value)) return value.join(", ");
        return value;
    }
    /**
   * Creates a Headers instance from a plain object or a Headers instance.
   *
   * @param headers a plain object or a Headers instance
   * @returns a headers instance
   */ static from(headers) {
        if (headers instanceof Headers) return headers;
        return new HeadersAdapter(headers);
    }
    append(name, value) {
        const existing = this.headers[name];
        if (typeof existing === "string") {
            this.headers[name] = [
                existing,
                value
            ];
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            this.headers[name] = value;
        }
    }
    delete(name) {
        delete this.headers[name];
    }
    get(name) {
        const value = this.headers[name];
        if (typeof value !== "undefined") return this.merge(value);
        return null;
    }
    has(name) {
        return typeof this.headers[name] !== "undefined";
    }
    set(name, value) {
        this.headers[name] = value;
    }
    forEach(callbackfn, thisArg) {
        for (const [name, value] of this.entries()){
            callbackfn.call(thisArg, value, name, this);
        }
    }
    *entries() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(name);
            yield [
                name,
                value
            ];
        }
    }
    *keys() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            yield name;
        }
    }
    *values() {
        for (const key of Object.keys(this.headers)){
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(key);
            yield value;
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
} //# sourceMappingURL=headers.js.map


/***/ }),

/***/ 8980:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "ReflectAdapter", ({
    enumerable: true,
    get: function() {
        return ReflectAdapter;
    }
}));
class ReflectAdapter {
    static get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === "function") {
            return value.bind(target);
        }
        return value;
    }
    static set(target, prop, value, receiver) {
        return Reflect.set(target, prop, value, receiver);
    }
    static has(target, prop) {
        return Reflect.has(target, prop);
    }
    static deleteProperty(target, prop) {
        return Reflect.deleteProperty(target, prop);
    }
} //# sourceMappingURL=reflect.js.map


/***/ }),

/***/ 4277:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ReadonlyRequestCookiesError: function() {
        return ReadonlyRequestCookiesError;
    },
    RequestCookiesAdapter: function() {
        return RequestCookiesAdapter;
    },
    getModifiedCookieValues: function() {
        return getModifiedCookieValues;
    },
    appendMutableCookies: function() {
        return appendMutableCookies;
    },
    MutableRequestCookiesAdapter: function() {
        return MutableRequestCookiesAdapter;
    }
});
const _cookies = __webpack_require__(2634);
const _reflect = __webpack_require__(8980);
class ReadonlyRequestCookiesError extends Error {
    constructor(){
        super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options");
    }
    static callable() {
        throw new ReadonlyRequestCookiesError();
    }
}
class RequestCookiesAdapter {
    static seal(cookies) {
        return new Proxy(cookies, {
            get (target, prop, receiver) {
                switch(prop){
                    case "clear":
                    case "delete":
                    case "set":
                        return ReadonlyRequestCookiesError.callable;
                    default:
                        return _reflect.ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
}
const SYMBOL_MODIFY_COOKIE_VALUES = Symbol.for("next.mutated.cookies");
function getModifiedCookieValues(cookies) {
    const modified = cookies[SYMBOL_MODIFY_COOKIE_VALUES];
    if (!modified || !Array.isArray(modified) || modified.length === 0) {
        return [];
    }
    return modified;
}
function appendMutableCookies(headers, mutableCookies) {
    const modifiedCookieValues = getModifiedCookieValues(mutableCookies);
    if (modifiedCookieValues.length === 0) {
        return false;
    }
    // Return a new response that extends the response with
    // the modified cookies as fallbacks. `res`' cookies
    // will still take precedence.
    const resCookies = new _cookies.ResponseCookies(headers);
    const returnedCookies = resCookies.getAll();
    // Set the modified cookies as fallbacks.
    for (const cookie of modifiedCookieValues){
        resCookies.set(cookie);
    }
    // Set the original cookies as the final values.
    for (const cookie of returnedCookies){
        resCookies.set(cookie);
    }
    return true;
}
class MutableRequestCookiesAdapter {
    static wrap(cookies, res) {
        const responseCookes = new _cookies.ResponseCookies(new Headers());
        for (const cookie of cookies.getAll()){
            responseCookes.set(cookie);
        }
        let modifiedValues = [];
        const modifiedCookies = new Set();
        const updateResponseCookies = ()=>{
            var _fetch___nextGetStaticStore;
            // TODO-APP: change method of getting staticGenerationAsyncStore
            const staticGenerationAsyncStore = fetch.__nextGetStaticStore == null ? void 0 : (_fetch___nextGetStaticStore = fetch.__nextGetStaticStore()) == null ? void 0 : _fetch___nextGetStaticStore.getStore();
            if (staticGenerationAsyncStore) {
                staticGenerationAsyncStore.pathWasRevalidated = true;
            }
            const allCookies = responseCookes.getAll();
            modifiedValues = allCookies.filter((c)=>modifiedCookies.has(c.name));
            if (res) {
                const serializedCookies = [];
                for (const cookie of modifiedValues){
                    const tempCookies = new _cookies.ResponseCookies(new Headers());
                    tempCookies.set(cookie);
                    serializedCookies.push(tempCookies.toString());
                }
                res.setHeader("Set-Cookie", serializedCookies);
            }
        };
        return new Proxy(responseCookes, {
            get (target, prop, receiver) {
                switch(prop){
                    // A special symbol to get the modified cookie values
                    case SYMBOL_MODIFY_COOKIE_VALUES:
                        return modifiedValues;
                    // TODO: Throw error if trying to set a cookie after the response
                    // headers have been set.
                    case "delete":
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === "string" ? args[0] : args[0].name);
                            try {
                                target.delete(...args);
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    case "set":
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === "string" ? args[0] : args[0].name);
                            try {
                                return target.set(...args);
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    default:
                        return _reflect.ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
} //# sourceMappingURL=request-cookies.js.map


/***/ }),

/***/ 2634:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    RequestCookies: function() {
        return _cookies.RequestCookies;
    },
    ResponseCookies: function() {
        return _cookies.ResponseCookies;
    }
});
const _cookies = __webpack_require__(4966); //# sourceMappingURL=cookies.js.map


/***/ }),

/***/ 404:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "getHostname", ({
    enumerable: true,
    get: function() {
        return getHostname;
    }
}));
function getHostname(parsed, headers) {
    // Get the hostname from the headers if it exists, otherwise use the parsed
    // hostname.
    let hostname;
    if ((headers == null ? void 0 : headers.host) && !Array.isArray(headers.host)) {
        hostname = headers.host.toString().split(":")[0];
    } else if (parsed.hostname) {
        hostname = parsed.hostname;
    } else return;
    return hostname.toLowerCase();
} //# sourceMappingURL=get-hostname.js.map


/***/ }),

/***/ 1050:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "addLocale", ({
    enumerable: true,
    get: function() {
        return addLocale;
    }
}));
const _addpathprefix = __webpack_require__(2196);
const _pathhasprefix = __webpack_require__(5251);
function addLocale(path, locale, defaultLocale, ignorePrefix) {
    // If no locale was given or the locale is the default locale, we don't need
    // to prefix the path.
    if (!locale || locale === defaultLocale) return path;
    const lower = path.toLowerCase();
    // If the path is an API path or the path already has the locale prefix, we
    // don't need to prefix the path.
    if (!ignorePrefix) {
        if ((0, _pathhasprefix.pathHasPrefix)(lower, "/api")) return path;
        if ((0, _pathhasprefix.pathHasPrefix)(lower, "/" + locale.toLowerCase())) return path;
    }
    // Add the locale prefix to the path.
    return (0, _addpathprefix.addPathPrefix)(path, "/" + locale);
} //# sourceMappingURL=add-locale.js.map


/***/ }),

/***/ 2196:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "addPathPrefix", ({
    enumerable: true,
    get: function() {
        return addPathPrefix;
    }
}));
const _parsepath = __webpack_require__(2189);
function addPathPrefix(path, prefix) {
    if (!path.startsWith("/") || !prefix) {
        return path;
    }
    const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
    return "" + prefix + pathname + query + hash;
} //# sourceMappingURL=add-path-prefix.js.map


/***/ }),

/***/ 527:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "addPathSuffix", ({
    enumerable: true,
    get: function() {
        return addPathSuffix;
    }
}));
const _parsepath = __webpack_require__(2189);
function addPathSuffix(path, suffix) {
    if (!path.startsWith("/") || !suffix) {
        return path;
    }
    const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
    return "" + pathname + suffix + query + hash;
} //# sourceMappingURL=add-path-suffix.js.map


/***/ }),

/***/ 7829:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "formatNextPathnameInfo", ({
    enumerable: true,
    get: function() {
        return formatNextPathnameInfo;
    }
}));
const _removetrailingslash = __webpack_require__(8069);
const _addpathprefix = __webpack_require__(2196);
const _addpathsuffix = __webpack_require__(527);
const _addlocale = __webpack_require__(1050);
function formatNextPathnameInfo(info) {
    let pathname = (0, _addlocale.addLocale)(info.pathname, info.locale, info.buildId ? undefined : info.defaultLocale, info.ignorePrefix);
    if (info.buildId || !info.trailingSlash) {
        pathname = (0, _removetrailingslash.removeTrailingSlash)(pathname);
    }
    if (info.buildId) {
        pathname = (0, _addpathsuffix.addPathSuffix)((0, _addpathprefix.addPathPrefix)(pathname, "/_next/data/" + info.buildId), info.pathname === "/" ? "index.json" : ".json");
    }
    pathname = (0, _addpathprefix.addPathPrefix)(pathname, info.basePath);
    return !info.buildId && info.trailingSlash ? !pathname.endsWith("/") ? (0, _addpathsuffix.addPathSuffix)(pathname, "/") : pathname : (0, _removetrailingslash.removeTrailingSlash)(pathname);
} //# sourceMappingURL=format-next-pathname-info.js.map


/***/ }),

/***/ 7969:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "getNextPathnameInfo", ({
    enumerable: true,
    get: function() {
        return getNextPathnameInfo;
    }
}));
const _normalizelocalepath = __webpack_require__(3134);
const _removepathprefix = __webpack_require__(7497);
const _pathhasprefix = __webpack_require__(5251);
function getNextPathnameInfo(pathname, options) {
    var _options_nextConfig;
    const { basePath, i18n, trailingSlash } = (_options_nextConfig = options.nextConfig) != null ? _options_nextConfig : {};
    const info = {
        pathname: pathname,
        trailingSlash: pathname !== "/" ? pathname.endsWith("/") : trailingSlash
    };
    if (basePath && (0, _pathhasprefix.pathHasPrefix)(info.pathname, basePath)) {
        info.pathname = (0, _removepathprefix.removePathPrefix)(info.pathname, basePath);
        info.basePath = basePath;
    }
    if (options.parseData === true && info.pathname.startsWith("/_next/data/") && info.pathname.endsWith(".json")) {
        const paths = info.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
        const buildId = paths[0];
        info.pathname = paths[1] !== "index" ? "/" + paths.slice(1).join("/") : "/";
        info.buildId = buildId;
    }
    // If provided, use the locale route normalizer to detect the locale instead
    // of the function below.
    if (options.i18nProvider) {
        const result = options.i18nProvider.analyze(info.pathname);
        info.locale = result.detectedLocale;
        var _result_pathname;
        info.pathname = (_result_pathname = result.pathname) != null ? _result_pathname : info.pathname;
    } else if (i18n) {
        const pathLocale = (0, _normalizelocalepath.normalizeLocalePath)(info.pathname, i18n.locales);
        info.locale = pathLocale.detectedLocale;
        var _pathLocale_pathname;
        info.pathname = (_pathLocale_pathname = pathLocale.pathname) != null ? _pathLocale_pathname : info.pathname;
    }
    return info;
} //# sourceMappingURL=get-next-pathname-info.js.map


/***/ }),

/***/ 2189:
/***/ ((__unused_webpack_module, exports) => {

/**
 * Given a path this function will find the pathname, query and hash and return
 * them. This is useful to parse full paths on the client side.
 * @param path A path to parse e.g. /foo/bar?id=1#hash
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "parsePath", ({
    enumerable: true,
    get: function() {
        return parsePath;
    }
}));
function parsePath(path) {
    const hashIndex = path.indexOf("#");
    const queryIndex = path.indexOf("?");
    const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
    if (hasQuery || hashIndex > -1) {
        return {
            pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
            query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : undefined) : "",
            hash: hashIndex > -1 ? path.slice(hashIndex) : ""
        };
    }
    return {
        pathname: path,
        query: "",
        hash: ""
    };
} //# sourceMappingURL=parse-path.js.map


/***/ }),

/***/ 5251:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "pathHasPrefix", ({
    enumerable: true,
    get: function() {
        return pathHasPrefix;
    }
}));
const _parsepath = __webpack_require__(2189);
function pathHasPrefix(path, prefix) {
    if (typeof path !== "string") {
        return false;
    }
    const { pathname } = (0, _parsepath.parsePath)(path);
    return pathname === prefix || pathname.startsWith(prefix + "/");
} //# sourceMappingURL=path-has-prefix.js.map


/***/ }),

/***/ 7497:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "removePathPrefix", ({
    enumerable: true,
    get: function() {
        return removePathPrefix;
    }
}));
const _pathhasprefix = __webpack_require__(5251);
function removePathPrefix(path, prefix) {
    // If the path doesn't start with the prefix we can return it as is. This
    // protects us from situations where the prefix is a substring of the path
    // prefix such as:
    //
    // For prefix: /blog
    //
    //   /blog -> true
    //   /blog/ -> true
    //   /blog/1 -> true
    //   /blogging -> false
    //   /blogging/ -> false
    //   /blogging/1 -> false
    if (!(0, _pathhasprefix.pathHasPrefix)(path, prefix)) {
        return path;
    }
    // Remove the prefix from the path via slicing.
    const withoutPrefix = path.slice(prefix.length);
    // If the path without the prefix starts with a `/` we can return it as is.
    if (withoutPrefix.startsWith("/")) {
        return withoutPrefix;
    }
    // If the path without the prefix doesn't start with a `/` we need to add it
    // back to the path to make sure it's a valid path.
    return "/" + withoutPrefix;
} //# sourceMappingURL=remove-path-prefix.js.map


/***/ })

};
;