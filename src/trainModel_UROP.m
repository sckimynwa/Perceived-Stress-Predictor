
%   This is UROP Machine_Learning Model
%   "Stress Predictor"
%   This Model has 4 input sources, 1 output result (range from 1 to 5)
%

%   load the data
load('finalResult.txt');
X = finalResult(:, [1:4]);
y = finalResult(:, 5);

%   parse the data into 3 (Train, Cross_Validation, Test)
X_train = X([1:370], :);
X_cv = X([371:490], :);
X_test = X([491:620], :);

y_train = y([1:370], :);
y_cv = y([371:490], :);
y_test = y([491:620], :);

%   FeatureScaling


%   set the input layer, hidden layer, result size
input_layer_size = 4;
hidden_layer_size = 3;
num_labels = 5;  % this is stress range

%   initialize Theta1, Theta2
initial_Theta1 = randInitializeWeights(input_layer_size, hidden_layer_size);
initial_Theta2 = randInitializeWeights(hidden_layer_size, num_labels);

%   Unroll Parameters
initial_nn_params = [initial_Theta1(:) ; initial_Theta2(:)];

%   Feed Forward
lambda = 1;
J = nnCostFunction(initial_nn_params, input_layer_size, hidden_layer_size, num_labels, X_train, y_train, lambda);

%   Training Neural Networks
%   Using Train Data
options = optimset('MaxIter', 50);
costFunction = @(p)nnCostFunction(p, input_layer_size, hidden_layer_size, num_labels, X_train, y_train, lambda);
[nn_params, cost] = fmincg(costFunction, initial_nn_params, options);

%   Reshape Data
Theta1 = reshape(nn_params(1:hidden_layer_size * (input_layer_size + 1)), hidden_layer_size, (input_layer_size +1 ));
Theta2 = reshape(nn_params((1+(hidden_layer_size * (input_layer_size+1))):end), num_labels, (hidden_layer_size+1));

%   Prediction
%   Prediction Accuracy
% =========================================================================
