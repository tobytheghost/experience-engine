module.exports = {
  output: {
    publicPath: '/'
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat'
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: [
              ['@babel/plugin-transform-runtime'],
              [
                '@babel/plugin-transform-react-jsx',
                {
                  pragma: 'h',
                  pragmaFrag: 'Fragment'
                }
              ],
              [
                'import',
                {
                  libraryName: 'antd',
                  style: true
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
        use: [{ loader: 'file-loader' }]
      },
      {
        test: /\.scss|\.css|\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                // modifyVars: themeVariables,
                javascriptEnabled: true
              }
            }
          }
        ]
      }
    ]
  },
  plugins: []
}
